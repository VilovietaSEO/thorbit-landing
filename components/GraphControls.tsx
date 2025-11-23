"use client";

interface GraphControlsProps {
  graphData: any;
  filters: {
    categories: Set<string>;
    tiers: Set<number>;
    searchTerm: string;
  };
  onFilterChange: (filters: any) => void;
}

export default function GraphControls({ graphData, filters, onFilterChange }: GraphControlsProps) {
  function toggleCategory(category: string) {
    const newCategories = new Set(filters.categories);
    if (newCategories.has(category)) {
      newCategories.delete(category);
    } else {
      newCategories.add(category);
    }
    onFilterChange({ ...filters, categories: newCategories });
  }

  function toggleTier(tier: number) {
    const newTiers = new Set(filters.tiers);
    if (newTiers.has(tier)) {
      newTiers.delete(tier);
    } else {
      newTiers.add(tier);
    }
    onFilterChange({ ...filters, tiers: newTiers });
  }

  function clearFilters() {
    onFilterChange({
      categories: new Set(),
      tiers: new Set(),
      searchTerm: ""
    });
  }

  return (
    <div className="card-v2 p-6">
      <h3 className="text-lg font-black text-text-primary mb-4">Filters</h3>

      {/* Search */}
      <div className="mb-4">
        <label className="text-sm text-text-secondary mb-2 block">Search Entities</label>
        <input
          type="text"
          placeholder="Search by name..."
          value={filters.searchTerm}
          onChange={(e) => onFilterChange({ ...filters, searchTerm: e.target.value })}
          className="w-full px-3 py-2 border border-border rounded-md text-sm bg-bg-primary text-text-primary"
        />
      </div>

      {/* Categories */}
      <div className="mb-4">
        <label className="text-sm text-text-secondary mb-2 block">Categories</label>
        <div className="flex flex-wrap gap-2">
          {graphData.metadata.categories.map((cat: any) => (
            <button
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              className="px-3 py-1 rounded-full text-xs font-semibold transition-all border-2"
              style={{
                backgroundColor: filters.categories.has(cat.id) ? cat.color : "white",
                borderColor: cat.color,
                color: filters.categories.has(cat.id) ? "white" : cat.color
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tiers */}
      <div className="mb-4">
        <label className="text-sm text-text-secondary mb-2 block">Tiers</label>
        <div className="flex gap-2">
          {graphData.metadata.tiers.map((tier: any) => (
            <button
              key={tier.tier}
              onClick={() => toggleTier(tier.tier)}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                filters.tiers.has(tier.tier)
                  ? "bg-primary text-white"
                  : "bg-bg-tertiary text-text-secondary hover:bg-bg-tertiary"
              }`}
            >
              Tier {tier.tier}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(filters.categories.size > 0 || filters.tiers.size > 0 || filters.searchTerm) && (
        <button
          onClick={clearFilters}
          className="w-full px-3 py-2 border border-border rounded-md text-sm text-text-secondary hover:bg-bg-tertiary transition-all"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
}
