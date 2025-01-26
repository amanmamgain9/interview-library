import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookmarkIcon, Share2Icon, XIcon } from 'lucide-react';

const LayoutModal = ({ isOpen, onClose, layout }) => {
  if (!layout) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gray-100 rounded">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              </div>
              <DialogTitle className="text-xl font-semibold">
                {layout?.title || 'Layout'}
              </DialogTitle>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100 transition-colors"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-gray-600">
            {layout?.description || 'Descriptive name of the Layout'}
          </p>

          <div className="flex flex-wrap gap-2">
            {layout?.tags?.map((tag) => (
              <Badge key={tag} variant="secondary">
                #{tag}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-200">
            <div>
              <p className="text-gray-600 text-sm">Used</p>
              <p className="font-semibold">{layout?.used || '0'}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Type</p>
              <p className="font-semibold">{layout?.type || 'Universal'}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Pages No.</p>
              <p className="font-semibold">{layout?.pages || '0'}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Business Questions</h3>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Question {num}</h4>
                  <p className="text-sm text-gray-600">
                    Short description of the item goes nicely here.
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" className="flex items-center gap-2">
              <BookmarkIcon className="w-4 h-4" />
              Favorite item
            </Button>
            <Button className="flex items-center gap-2">
              <Share2Icon className="w-4 h-4" />
              Share
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LayoutModal;