import React from 'react';

/**
 * Componente Badge para indicar cantidades, contadores o estados.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - El valor o texto a mostrar dentro del badge.
 * @param {string} [props.variant="primary"] - Variante estética del badge ('primary', 'secondary', 'rust').
 * @param {string} [props.className=""] - Clases CSS adicionales.
 * @param {Object} [props.style] - Estilos inline opcionales.
 */
function Badge({
  children,
  variant = 'primary',
  className = '',
  style,
  ...props
}) {
  if (children === undefined || children === null || children === '') return null;

  return (
    <span
      className={`common-badge common-badge--${variant} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
