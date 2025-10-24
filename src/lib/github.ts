import ky from "ky";

const username = (import.meta.env.VITE_GITHUB_USERNAME ?? "").trim();

if (!username) {
  throw new Error(
    "Missing VITE_GITHUB_USERNAME. Put it in .env and restart the dev server."
  );
}

const rest = ky.create({
  prefixUrl: "https://api.github.com",
  headers: {
    "X-GitHub-Api-Version": "2022-11-28",
    Accept: "application/vnd.github+json",
  },
});

export type Repo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  pushed_at: string;
  homepage?: string | null;
  archived?: boolean;
  disabled?: boolean;
};

async function fetchPaginated<T>(
  path: string,
  searchParams: Record<string, string> = {}
): Promise<T[]> {
  const all: T[] = [];
  let page = 1;
  const per_page = 100;

  while (true) {
    const res = await rest.get(path, {
      searchParams: { ...searchParams, per_page: String(per_page), page: String(page) },
    });
    const data = (await res.json()) as T[];
    all.push(...data);

    const link = res.headers.get("link");
    const hasNext = link && link.includes('rel="next"');
    if (!hasNext || data.length < per_page) break;

    page += 1;
  }

  return all;
}

export async function fetchAllRepos(): Promise<Repo[]> {
  const raw = await fetchPaginated<any>(`users/${username}/repos`, {
    sort: "updated",
    direction: "desc",
  });

  const repos: Repo[] = raw.map((r) => ({
    id: r.id,
    name: r.name,
    full_name: r.full_name,
    html_url: r.html_url,
    description: r.description ?? null,
    stargazers_count: r.stargazers_count ?? 0,
    forks_count: r.forks_count ?? 0,
    language: r.language ?? null,
    topics: r.topics ?? [],
    pushed_at: r.pushed_at,
    homepage: r.homepage ?? null,
    archived: r.archived ?? false,
    disabled: r.disabled ?? false,
  }));

  return repos.filter((r) => !r.archived && !r.disabled);
}

export async function fetchReposSortedByStars(limit?: number): Promise<Repo[]> {
  const repos = await fetchAllRepos();
  repos.sort((a, b) => {
    if (b.stargazers_count !== a.stargazers_count) {
      return b.stargazers_count - a.stargazers_count;
    }
    return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
  });
  return typeof limit === "number" ? repos.slice(0, limit) : repos;
}

export async function fetchReposSortedByRecent(limit?: number): Promise<Repo[]> {
  const repos = await fetchAllRepos();
  repos.sort(
    (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
  );
  return typeof limit === "number" ? repos.slice(0, limit) : repos;
}

export async function fetchUserStats() {
  const [user, repos] = await Promise.all([
    rest.get(`users/${username}`).json<any>(),
    fetchAllRepos(),
  ]);

  const totals = repos.reduce(
    (acc, r) => {
      acc.stars += r.stargazers_count;
      acc.forks += r.forks_count;
      if (r.language) acc.lang[r.language] = (acc.lang[r.language] || 0) + 1;
      return acc;
    },
    { stars: 0, forks: 0, lang: {} as Record<string, number> }
  );

  const topLanguages = Object.entries(totals.lang)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .slice(0, 5)
    .map(([name, count]) => ({ name, count: count as number }));

  return {
    avatar_url: user.avatar_url as string,
    name: user.name as string,
    login: user.login as string,
    bio: (user.bio as string) ?? null,
    followers: user.followers as number,
    following: user.following as number,
    public_repos: user.public_repos as number,
    totals: { stars: totals.stars, forks: totals.forks },
    topLanguages,
  };
}
