import React, { useState, useEffect, useRef, useCallback } from 'react';
import ProviderCard from './ProviderCard';
import Icon from '../../../components/AppIcon';

const ProviderGrid = ({ 
  providers, 
  loading, 
  hasMore, 
  onLoadMore, 
  onQuickContact,
  className = '' 
}) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const observerRef = useRef();
  const loadingRef = useRef();

  // Infinite scroll implementation
  const lastProviderElementRef = useCallback(node => {
    if (loading) return;
    if (observerRef?.current) observerRef?.current?.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loadingMore) {
        setLoadingMore(true);
        onLoadMore().finally(() => setLoadingMore(false));
      }
    });
    
    if (node) observerRef?.current?.observe(node);
  }, [loading, hasMore, loadingMore, onLoadMore]);

  // Skeleton loading cards
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl border border-border overflow-hidden animate-pulse">
      <div className="h-48 bg-muted"></div>
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div className="space-y-2 flex-1">
            <div className="h-5 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
          <div className="h-4 bg-muted rounded w-12"></div>
        </div>
        <div className="flex space-x-4">
          <div className="h-4 bg-muted rounded w-20"></div>
          <div className="h-4 bg-muted rounded w-16"></div>
        </div>
        <div className="h-12 bg-muted rounded"></div>
        <div className="flex space-x-2">
          <div className="h-8 bg-muted rounded flex-1"></div>
          <div className="h-8 bg-muted rounded flex-1"></div>
        </div>
      </div>
    </div>
  );

  // Empty state
  const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name="Search" size={32} className="text-text-secondary" />
      </div>
      <h3 className="text-xl font-semibold text-text-primary mb-2">
        No providers found
      </h3>
      <p className="text-text-secondary text-center max-w-md mb-6">
        We couldn't find any service providers matching your criteria. Try adjusting your filters or search terms.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => window.location?.reload()}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Icon name="RefreshCw" size={16} />
          <span>Refresh Search</span>
        </button>
        <button
          onClick={() => {
            // Clear filters functionality would be implemented here
            console.log('Clear all filters');
          }}
          className="flex items-center space-x-2 px-4 py-2 border border-border text-text-primary rounded-lg hover:bg-muted transition-colors duration-200"
        >
          <Icon name="X" size={16} />
          <span>Clear Filters</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className={className}>
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Initial Loading State */}
        {loading && providers?.length === 0 && (
          <>
            {Array.from({ length: 8 })?.map((_, index) => (
              <SkeletonCard key={`skeleton-${index}`} />
            ))}
          </>
        )}

        {/* Provider Cards */}
        {providers?.map((provider, index) => {
          const isLast = index === providers?.length - 1;
          return (
            <div
              key={provider?.id}
              ref={isLast ? lastProviderElementRef : null}
              className="transform hover:scale-105 transition-transform duration-200"
            >
              <ProviderCard
                provider={provider}
                onQuickContact={onQuickContact}
              />
            </div>
          );
        })}

        {/* Loading More Cards */}
        {loadingMore && (
          <>
            {Array.from({ length: 4 })?.map((_, index) => (
              <SkeletonCard key={`loading-more-${index}`} />
            ))}
          </>
        )}

        {/* Empty State */}
        {!loading && providers?.length === 0 && <EmptyState />}
      </div>
      {/* Load More Button (fallback for infinite scroll) */}
      {!loading && hasMore && providers?.length > 0 && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => {
              setLoadingMore(true);
              onLoadMore()?.finally(() => setLoadingMore(false));
            }}
            disabled={loadingMore}
            className="flex items-center space-x-2 px-6 py-3 bg-white border border-border text-text-primary rounded-lg hover:border-primary hover:bg-primary/5 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingMore ? (
              <>
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span>Loading more...</span>
              </>
            ) : (
              <>
                <Icon name="ChevronDown" size={16} />
                <span>Load More Providers</span>
              </>
            )}
          </button>
        </div>
      )}
      {/* End of Results */}
      {!loading && !hasMore && providers?.length > 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Icon name="CheckCircle" size={24} className="text-secondary" />
          </div>
          <p className="text-text-secondary text-center">
            You've seen all available providers
          </p>
          <p className="text-sm text-text-secondary mt-1">
            Try adjusting your filters to see more results
          </p>
        </div>
      )}
      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
};

// Scroll to Top Component
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-strong hover:bg-blue-700 transition-all duration-200 z-30 flex items-center justify-center"
      aria-label="Scroll to top"
    >
      <Icon name="ArrowUp" size={20} />
    </button>
  );
};

export default ProviderGrid;