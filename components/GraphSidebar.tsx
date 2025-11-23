"use client";

import { X } from "lucide-react";

interface GraphSidebarProps {
  node: any;
  onClose: () => void;
  onNodeClick?: (nodeId: string) => void;
}

export default function GraphSidebar({ node, onClose, onNodeClick }: GraphSidebarProps) {
  // Extract metadata fields
  const metadata = node.metadata || {};
  const keywords = metadata.keywords || [];
  const relationships = metadata.relationships || {};
  const useCases = metadata.useCases || metadata.use_cases || [];
  const queryIntents = metadata.queryIntents || metadata.query_intents || [];
  const referencedBy = metadata.referencedBy || metadata.referenced_by || {};
  const description = metadata.description || metadata.initial_description;
  const type = metadata.type;
  const connectionStats = metadata.connectionStats || metadata.connection_stats || node.connectionStats || node.connection_stats || {};
  const synonyms = metadata.synonyms || [];

  // Get reference counts
  const totalOutgoing = metadata.total_outgoing_references || metadata.totalOutgoingReferences || connectionStats.outgoing;
  const totalIncoming = metadata.total_incoming_references || metadata.totalIncomingReferences || connectionStats.incoming;

  // Handle content_sections
  let rawContentSections = metadata.contentSections || metadata.content_sections || {};
  let contentSections: any = {};

  if (Array.isArray(rawContentSections)) {
    rawContentSections.forEach((section: any) => {
      Object.assign(contentSections, section);
    });
  } else {
    contentSections = rawContentSections;
  }

  const importanceColors = {
    critical: "bg-critical/10 text-critical",
    high: "bg-imp-high/10 text-imp-high",
    medium: "bg-imp-medium/10 text-imp-medium",
    low: "bg-imp-low/10 text-imp-low"
  };

  const tierColors = {
    1: "bg-red-100 text-red-800",
    2: "bg-blue-100 text-blue-800",
    3: "bg-green-100 text-green-800"
  };

  const handleEntityClick = (entityId: string) => {
    if (onNodeClick) {
      onNodeClick(entityId);
    }
  };

  return (
    <div className="bg-bg-secondary rounded-lg p-4 max-h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-4 gap-2">
        <h3 className="text-xl font-bold text-text-primary flex-1">{node.name}</h3>
        <span className={`px-3 py-1 rounded text-xs font-bold whitespace-nowrap ${tierColors[node.tier as keyof typeof tierColors] || tierColors[3]}`}>
          TIER {node.tier}
        </span>
        <button
          onClick={onClose}
          className="text-text-secondary hover:text-text-primary transition-colors flex-shrink-0"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Basic Metadata */}
      <div className="space-y-1 text-sm mb-4 pb-4 border-b border-border">
        <div><span className="text-text-secondary">ID:</span> <code className="text-xs bg-bg-tertiary px-2 py-0.5 rounded">{node.id}</code></div>
        <div><span className="text-text-secondary">Type:</span> <span className="text-text-primary">{type || 'N/A'}</span></div>
        <div><span className="text-text-secondary">Category:</span> <span className="text-text-primary capitalize">{node.category}</span></div>
        <div>
          <span className="text-text-secondary">Importance:</span>{' '}
          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${importanceColors[node.importance as keyof typeof importanceColors]}`}>
            {node.importance}
          </span>
        </div>
        {(totalOutgoing !== undefined || totalIncoming !== undefined) && (
          <div>
            <span className="text-text-secondary">References:</span>{' '}
            <span className="text-text-primary">
              {totalOutgoing !== undefined && `Out: ${totalOutgoing}`}
              {totalOutgoing !== undefined && totalIncoming !== undefined && ' | '}
              {totalIncoming !== undefined && `In: ${totalIncoming}`}
            </span>
          </div>
        )}
        <div><span className="text-text-secondary">Semantic Relationships:</span> <span className="text-text-primary font-semibold">{node.connections}</span></div>
      </div>

      {/* Coverage Statistics */}
      {node.coverage && (
        <div className="mb-4 pb-4 border-b border-border">
          <h4 className="text-sm font-bold text-text-primary mb-2">Coverage</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">High:</span>
              <span className="text-high font-semibold">{node.coverage.high}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Medium:</span>
              <span className="text-medium font-semibold">{node.coverage.medium}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Low:</span>
              <span className="text-low font-semibold">{node.coverage.low}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-border">
              <span className="text-text-secondary">Total:</span>
              <span className="text-text-primary font-bold">{node.coverage.total}</span>
            </div>
          </div>
        </div>
      )}

      {/* Keywords */}
      {keywords.length > 0 && (
        <div className="mb-4 pb-4 border-b border-border">
          <h4 className="text-sm font-bold text-text-primary mb-2">Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword: string, idx: number) => (
              <span
                key={idx}
                className="px-2 py-1 bg-bg-tertiary text-text-secondary rounded text-xs"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Synonyms */}
      {synonyms.length > 0 && (
        <div className="mb-4 pb-4 border-b border-border">
          <h4 className="text-sm font-bold text-text-primary mb-2">Synonyms</h4>
          <div className="flex flex-wrap gap-2">
            {synonyms.map((synonym: string, idx: number) => (
              <span
                key={idx}
                className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
              >
                {synonym}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Connection Stats */}
      {Object.keys(connectionStats).length > 0 && (
        <div className="mb-4 pb-4 border-b border-border">
          <h4 className="text-sm font-bold text-text-primary mb-2">Connection Statistics</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {connectionStats.outgoing !== undefined && (
              <div>
                <span className="text-text-secondary">Outgoing:</span>{' '}
                <span className="text-text-primary font-semibold">{connectionStats.outgoing}</span>
              </div>
            )}
            {connectionStats.incoming !== undefined && (
              <div>
                <span className="text-text-secondary">Incoming:</span>{' '}
                <span className="text-text-primary font-semibold">{connectionStats.incoming}</span>
              </div>
            )}
            {connectionStats.total !== undefined && (
              <div>
                <span className="text-text-secondary">Total:</span>{' '}
                <span className="text-text-primary font-semibold">{connectionStats.total}</span>
              </div>
            )}
            {connectionStats.orphan !== undefined && (
              <div>
                <span className="text-text-secondary">Orphan:</span>{' '}
                <span className={`font-semibold ${connectionStats.orphan ? 'text-red-600' : 'text-green-600'}`}>
                  {connectionStats.orphan ? 'Yes' : 'No'}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Relationships */}
      {Object.keys(relationships).length > 0 && (
        <div className="mb-4 pb-4 border-b border-border">
          <h4 className="text-sm font-bold text-text-primary mb-2">Relationships</h4>
          {Object.entries(relationships).map(([relType, entities]: [string, any]) => (
            <div key={relType} className="mb-3 last:mb-0">
              <div className="text-xs font-semibold text-text-secondary uppercase mb-1">
                {relType.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <ul className="space-y-1">
                {(Array.isArray(entities) ? entities : [entities]).map((entity: any, idx: number) => {
                  const entityName = typeof entity === 'string' ? entity : (entity.name || entity.id || 'Unknown');
                  const entityId = typeof entity === 'string' ? entity : (entity.entity_id || entity.entityId || entity.id);

                  return (
                    <li
                      key={idx}
                      className="text-sm text-primary hover:underline cursor-pointer pl-3 relative before:content-['•'] before:absolute before:left-0"
                      onClick={() => entityId && handleEntityClick(entityId)}
                    >
                      {entityName}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Use Cases */}
      {useCases.length > 0 && (
        <div className="mb-4 pb-4 border-b border-border">
          <h4 className="text-sm font-bold text-text-primary mb-2">Use Cases</h4>
          <ul className="space-y-2">
            {useCases.map((useCase: any, idx: number) => {
              const text = typeof useCase === 'string' ? useCase : (useCase.scenario || useCase.description || '');
              return (
                <li key={idx} className="text-xs text-text-secondary leading-relaxed pl-3 relative before:content-['→'] before:absolute before:left-0">
                  {text}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Search Queries */}
      {queryIntents.length > 0 && (
        <div className="mb-4 pb-4 border-b border-border">
          <h4 className="text-sm font-bold text-text-primary mb-2">Search Queries</h4>
          <ul className="space-y-1">
            {queryIntents.map((query: any, idx: number) => {
              const queryText = typeof query === 'string' ? query : (query.query || query.intent || '');
              return (
                <li key={idx} className="text-xs text-text-secondary">
                  "{queryText}"
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Content Sections */}
      {Object.keys(contentSections).length > 0 && (
        <>
          {Object.entries(contentSections).map(([sectionKey, sectionContent]: [string, any]) => {
            let content = '';
            if (Array.isArray(sectionContent)) {
              content = sectionContent.join(' ');
            } else if (typeof sectionContent === 'object') {
              content = sectionContent.text || sectionContent.content || JSON.stringify(sectionContent);
            } else {
              content = sectionContent;
            }

            const sectionTitle = sectionKey
              .replace(/_/g, ' ')
              .replace(/([A-Z])/g, ' $1')
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')
              .trim();

            return content ? (
              <div key={sectionKey} className="mb-4 pb-4 border-b border-border">
                <h4 className="text-sm font-bold text-text-primary mb-2">{sectionTitle}</h4>
                <p className="text-xs text-text-secondary leading-relaxed">{content}</p>
              </div>
            ) : null;
          })}
        </>
      )}

      {/* Referenced By */}
      {Object.keys(referencedBy).length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-bold text-text-primary mb-2">Referenced By</h4>
          {Object.entries(referencedBy).map(([relType, entities]: [string, any]) => (
            <div key={relType} className="mb-3 last:mb-0">
              <div className="text-xs font-semibold text-text-secondary uppercase mb-1">
                {relType.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <ul className="space-y-1">
                {(Array.isArray(entities) ? entities : [entities]).map((entity: any, idx: number) => {
                  const entityName = typeof entity === 'string' ? entity : (entity.name || entity.id || 'Unknown');
                  const entityId = typeof entity === 'string' ? entity : (entity.entity_id || entity.entityId || entity.id);

                  return (
                    <li
                      key={idx}
                      className="text-sm text-primary hover:underline cursor-pointer pl-3 relative before:content-['•'] before:absolute before:left-0"
                      onClick={() => entityId && handleEntityClick(entityId)}
                    >
                      {entityName}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Description fallback */}
      {!contentSections.overview && description && (
        <div className="mb-4 pb-4 border-b border-border">
          <h4 className="text-sm font-bold text-text-primary mb-2">Description</h4>
          <p className="text-xs text-text-secondary leading-relaxed">{description}</p>
        </div>
      )}
    </div>
  );
}
