import { toast } from "react-toastify";
import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

const TYPE_STYLES = {
  Notes: "bg-blue-50 text-blue-700",
  "Question Paper": "bg-green-50 text-green-700",
  Youtube: "bg-red-50 text-red-700",
  "Important Courses": "bg-purple-50 text-purple-700",
  Default: "bg-gray-100 text-gray-700",
};

export function ResourceCard({ item }) {
  const isDownloadable =
    item.type === "Notes" || item.type === "Question Paper";

  const handleAction = () => {
    if (!item.link) {
      toast.error("Resource link not available");
      return;
    }

    if (isDownloadable) {
      const a = document.createElement("a");
      a.href = item.link;
      a.download = item.title || "resource";
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      window.open(item.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
      <div className="flex items-center justify-between mb-3">
        
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            TYPE_STYLES[item.type] || TYPE_STYLES.Default
          }`}
        >
          {item.type}
        </span>
        <span className="text-xs text-gray-500 flex items-center gap-1">
          <TagIcon className="w-4 h-4" />
          {item.subject || "General"}
        </span>
      </div>

      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
        {item.title}
      </h3>

      <p className="text-xs text-gray-500 line-clamp-2 mb-4">
        {item.description || "No description available"}
      </p>

      <button
        onClick={handleAction}
        className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition ${
          isDownloadable
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isDownloadable ? (
          <>
            <ArrowDownTrayIcon className="w-4 h-4" />
            Download
          </>
        ) : (
          <>
            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            Open Link
          </>
        )}
      </button>
    </div>
  );
}
export default ResourceCard;