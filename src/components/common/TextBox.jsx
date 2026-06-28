import React from 'react';
import Label from './Label';

/**
 * Componente TextBox reutilizable para campos de entrada de texto.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.label] - Texto de la etiqueta de formulario.
 * @param {string|number} props.value - Valor del input.
 * @param {string} [props.placeholder] - Texto sugerido dentro del input.
 * @param {Function} props.onChange - Evento disparado al cambiar el valor.
 * @param {boolean} [props.disabled=false] - Deshabilita el input.
 * @param {boolean} [props.readOnly=false] - Establece el input como de solo lectura.
 * @param {boolean} [props.error=false] - Activa el estado de error (borde rojo).
 * @param {string} [props.helperText] - Texto explicativo o de error debajo del input.
 * @param {string} [props.leftIcon] - Clase del ícono Font Awesome izquierdo.
 * @param {string} [props.rightIcon] - Clase del ícono Font Awesome derecho.
 * @param {string} [props.type="text"] - Tipo de entrada ('text', 'number', 'email', etc.).
 * @param {string} props.name - Nombre del input para el formulario.
 * @param {string} props.id - ID único del elemento.
 * @param {boolean} [props.required=false] - Indica si el campo es requerido.
 * @param {string} [props.className=""] - Clases CSS del contenedor principal.
 */
function TextBox({
  label,
  value,
  placeholder,
  onChange,
  disabled = false,
  readOnly = false,
  error = false,
  helperText,
  leftIcon,
  rightIcon,
  type = 'text',
  name,
  id,
  required = false,
  className = '',
  ...props
}) {
  return (
    <div className={`common-field-wrapper ${error ? 'common-field-wrapper--error' : ''} ${className}`}>
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      
      <div className="common-input-container">
        {leftIcon && (
          <span className="common-input-icon common-input-icon--left">
            <i className={leftIcon} />
          </span>
        )}

        <input
          type={type}
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          className={`common-input 
            ${leftIcon ? 'common-input--has-left-icon' : ''} 
            ${rightIcon ? 'common-input--has-right-icon' : ''} 
            ${error ? 'common-input--error' : ''}
          `}
          {...props}
        />

        {rightIcon && (
          <span className="common-input-icon common-input-icon--right">
            <i className={rightIcon} />
          </span>
        )}
      </div>

      {helperText && (
        <span className={`common-field-helper ${error ? 'common-field-helper--error' : ''}`}>
          {helperText}
        </span>
      )}
    </div>
  );
}

export default TextBox;
