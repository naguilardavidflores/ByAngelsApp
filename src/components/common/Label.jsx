import React from 'react';

/**
 * Componente Label reutilizable para etiquetas de formulario.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.htmlFor] - Identificador del input asociado.
 * @param {React.ReactNode} props.children - Contenido de la etiqueta.
 * @param {boolean} [props.required=false] - Indica si el campo es obligatorio (agrega asterisco).
 * @param {string} [props.className=""] - Clases CSS adicionales.
 */
function Label({
  htmlFor,
  children,
  required = false,
  className = '',
  ...props
}) {
  if (!children) return null;
  
  return (
    <label
      htmlFor={htmlFor}
      className={`common-label ${required ? 'common-label--required' : ''} ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}

export default Label;
