import { techStack } from '../../data/techStack';
import type { TechStackItem } from '../../types';

export function TechStackGrid() {
  const byCategory = new Map<TechStackItem['category'], TechStackItem[]>();
  for (const item of techStack) {
    const list = byCategory.get(item.category) ?? [];
    list.push(item);
    byCategory.set(item.category, list);
  }

  return (
    <div>
      {[...byCategory.entries()].map(([category, items]) => (
        <div key={category} className="stack-category">
          <h4>{category}</h4>
          <div className="chip-grid">
            {items.map((item) => (
              <span key={item.id} className="chip">
                {item.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
