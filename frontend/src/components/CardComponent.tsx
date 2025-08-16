import React from "react";

interface Card {
  id: number;
  name: string;
  email: string;
}

interface CardComponentProps {
  card: Card;
  onDelete: (id: number) => void;
  onEdit: (card: Card) => void;
}

const CardComponent: React.FC<CardComponentProps> = ({ card, onDelete, onEdit }) => {
  return (
    <div className="group bg-surface border border-border-light hover:border-border p-12 rounded-2xl transition-all duration-150 animate-slide-up">
      <div className="space-y-8">
        <div className="space-y-6">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center">
            <span className="text-xl font-medium text-white tracking-tight">
              {card.name.charAt(0).toUpperCase()}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-medium text-text-primary tracking-tight leading-tight">
              {card.name}
            </h3>
            <p className="text-base text-text-tertiary font-light">
              ID {card.id}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="text-base text-text-secondary font-light">
            {card.email}
          </div>

          <div className="flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => onEdit(card)}
              className="text-text-tertiary hover:text-text-primary transition-colors duration-150 font-light"
              title="Edit user"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(card.id)}
              className="text-text-tertiary hover:text-text-primary transition-colors duration-150 font-light"
              title="Delete user"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;