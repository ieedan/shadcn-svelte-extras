import { PersistedState } from 'runed';

type FrecencyItem = {
	uses: number;
	lastUsage: number;
};

type PersistedStateOptions<T> = ConstructorParameters<typeof PersistedState<T>>[2];

type UseFrecencyOptions = PersistedStateOptions<FrecencyMap> & {
	maxItems?: number;
};

type FrecencyMap = Record<string, FrecencyItem | undefined>;

export class UseFrecency {
	#items: PersistedState<FrecencyMap>;

	constructor(
		key: string,
		initialValue: FrecencyMap = {},
		readonly opts: UseFrecencyOptions = {}
	) {
		this.#items = new PersistedState<FrecencyMap>(key, initialValue, this.opts);

		this.use = this.use.bind(this);
	}

	use(key: string) {
		const item = this.#items.current[key];

		this.#items.current[key] = {
			uses: 1 + (item?.uses ?? 0),
			lastUsage: Date.now()
		};
	}

	get items() {
		return Array.from(Object.entries(this.#items.current))
			.filter(([_a, a]) => a !== undefined)
			.sort(([_a, a], [_b, b]) => {
				if (a!.uses > b!.uses) return -1;

				if (b!.uses > a!.uses) return 1;

				return a!.lastUsage - b!.lastUsage;
			})
			.slice(0, this.opts.maxItems)
			.map(([key]) => key);
	}

	clear() {
		this.#items.current = {};
	}
}
