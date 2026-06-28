# Plan de Implementación - Librería de Componentes Reutilizables

Crearemos una librería pequeña y altamente reutilizable de componentes de formulario y botones bajo la siguiente estructura y especificaciones.

## Estructura de Carpetas Propuesta

Proponemos la creación de una carpeta `common` dentro de `src/components` para albergar los nuevos componentes:

```
src/
└── components/
    └── common/
        ├── Button.jsx       # Componente de botón reutilizable
        ├── TextBox.jsx      # Componente de campo de texto
        ├── ComboBox.jsx     # Componente de selección (select/dropdown)
        ├── Label.jsx        # Componente de etiqueta / Label auxiliar
        └── Badge.jsx        # Componente de insignia / Badge para conteos o estados
```

Para los estilos de estos componentes, añadiremos clases CSS en un archivo dedicado `src/components/common/common.css` e importarlo directamente, o agregarlo al final de `src/index.css` de manera limpia y modular para evitar dependencias adicionales y usar clases de CSS puro.

---

## Componentes a Crear

### 1. Button.jsx
Soportará:
- Solo texto, solo ícono (requiere `ariaLabel`), o texto + ícono.
- Iconos personalizados mediante clases de Font Awesome (ej: `"fa-solid fa-rotate"`).
- Propiedad `iconPosition` ("left" | "right") para colocar el ícono al inicio o final.
- Soporte para badge opcional.
- Soporte para variante (className custom, disabled, onClick, etc.).

### 2. TextBox.jsx
Soportará:
- Etiqueta (`label`), placeholder, value, onChange.
- Iconos izquierdos y derechos opcionales (`leftIcon` y `rightIcon`).
- Gestión de errores (`error` y `helperText`).
- Atributos estándar de input: disabled, readOnly, type, name, id, required.

### 3. ComboBox.jsx
Soportará:
- Etiqueta (`label`), value, placeholder, onChange.
- Opciones en formato `[{ value, label }]`.
- Gestión de errores (`error` y `helperText`).
- Atributos estándar: disabled, name, id, required.

### 4. Label.jsx y Badge.jsx
Componentes auxiliares sencillos e independientes para mantener modularidad.

---

## Plan de Verificación y Demo

Crearemos un componente de prueba/demo interactivo `src/components/common/DemoComponents.jsx` para probar visual y funcionalmente todos los estados de los componentes.
Además, implementaremos una alerta en consola o visual cuando a un botón de "solo ícono" le falte su respectiva propiedad `ariaLabel`.
Tambien propondremos la refactorización de `MainModelDisplay.jsx` para integrar el nuevo `Button.jsx`.
