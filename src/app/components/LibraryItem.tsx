interface LibraryItemProps {
    name: string;
    description: string;
    date: string;
  }
  
  export const LibraryItem = ({ name, description, date }: LibraryItemProps) => {
    return (
      <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-gray-400 rounded-full" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
          <p className="text-xs text-gray-400 mt-2">{date}</p>
        </div>
      </div>
    );
  };