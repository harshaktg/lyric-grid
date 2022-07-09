import { useMemo } from 'react';
import { BUTTON_MAP } from 'config/constants';

function Button({ children, icon, onClick }) {
  const isAvailable = useMemo(() => icon && !!BUTTON_MAP[icon], [icon]);
  return (
    <button className="btn" onClick={onClick}>
      {isAvailable && (
        <img src={BUTTON_MAP[icon]} alt="History" className="inline pr-2" />
      )}
      <span>{children}</span>
    </button>
  );
}

export default Button;
