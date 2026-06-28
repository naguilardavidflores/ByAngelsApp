import React from 'react';
import Badge from './Badge';

/**
 * Componente Button flexible y reutilizable.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.text] - El texto del botón.
 * @param {string} [props.icon] - Clase CSS del ícono (ej. "fa-solid fa-rotate").
 * @param {string} [props.iconPosition="left"] - Posición del ícono ('left' | 'right').
 * @param {string} [props.ariaLabel] - Etiqueta accesible. Obligatorio si solo tiene ícono.
 * @param {string} [props.variant="primary"] - Estilo visual del botón ('primary' | 'secondary' | 'rotate-icon' | 'lang-icon' | 'blank').
 * @param {string} [props.size="md"] - Tamaño del botón ('sm' | 'md' | 'lg').
 * @param {boolean} [props.disabled=false] - Deshabilita la interacción con el botón.
 * @param {string} [props.title] - Texto tooltip al pasar el cursor.
 * @param {string} [props.className=""] - Clases CSS extras.
 * @param {Function} [props.onClick] - Función callback al dar click.
 * @param {number|string} [props.badge] - Cantidad opcional para mostrar en una insignia/badge.
 * @param {Object} [props.style] - Estilos inline adicionales.
 */
function Button({
  text,
  icon,
  iconPosition = 'left',
  ariaLabel,
  variant = 'primary',
  size = 'md',
  disabled = false,
  title,
  className = '',
  onClick,
  badge,
  style,
  children,
  ...props
}) {
  const hasText = Boolean(text || children);
  const hasIcon = Boolean(icon);

  // Validación en desarrollo: Si solo hay ícono (no hay texto), se requiere ariaLabel
  if (!hasText && hasIcon && !ariaLabel && !title) {
    console.warn(
      `[Button Warning]: El botón con ícono "${icon}" no tiene 'ariaLabel' ni 'title'. Esto afecta la accesibilidad.`
    );
  }

  // Renderizar contenido interno
  const renderIcon = () => {
    if (!icon) return null;
    
    // Si el ícono es un emoji directo en lugar de una clase CSS de Font Awesome
    if (!icon.includes('fa-') && icon.length <= 4) {
      return <span className="common-button__emoji-icon">{icon}</span>;
    }

    return <i className={`${icon} common-button__icon`} />;
  };

  const renderBadge = () => {
    if (badge === undefined || badge === null || badge === '') return null;
    return (
      <Badge variant="rust" className="common-button__badge">
        {badge}
      </Badge>
    );
  };

  return (
    <button
      type="button"
      className={`common-button common-button--${variant} common-button--${size} ${className}`}
      disabled={disabled}
      title={title}
      onClick={onClick}
      aria-label={ariaLabel || title || text || (typeof children === 'string' ? children : undefined)}
      style={style}
      {...props}
    >
      {hasIcon && iconPosition === 'left' && renderIcon()}
      
      {hasText && (
        <span className="common-button__text">
          {text || children}
        </span>
      )}

      {hasIcon && iconPosition === 'right' && renderIcon()}

      {renderBadge()}
    </button>
  );
}

export default Button;
