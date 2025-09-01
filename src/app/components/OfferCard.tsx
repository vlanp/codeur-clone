import { useState } from "react";
import {
  Clock,
  Euro,
  MessageSquare,
  User,
  ChevronDown,
  ChevronUp,
  Calendar,
} from "lucide-react";
import type { IOffer } from "../../interfaces/IOffer";

const OfferCard = ({ offer }: { offer: IOffer }) => {
  const [isMessageExpanded, setIsMessageExpanded] = useState(false);

  const truncateMessage = (message: string, maxLength: number = 150) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + "...";
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">Chatbot</h3>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Euro className="w-5 h-5 text-green-600" />
          <span className="text-2xl font-bold text-gray-900">
            {offer.price}€
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="font-medium">
              {offer.duration} Jour{offer.duration > 1 && "s"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">
              {formatDate(offer.publicationDate)}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Proposition</span>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-700 leading-relaxed">
            {isMessageExpanded ? offer.message : truncateMessage(offer.message)}
          </p>
          {offer.message.length > 150 && (
            <button
              onClick={() => setIsMessageExpanded(!isMessageExpanded)}
              className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 transition-colors"
            >
              {isMessageExpanded ? "Voir moins" : "Voir plus"}
              {isMessageExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
