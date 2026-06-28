# Manual de Pruebas y Validación (QA) para el Sub-Agente

Este documento describe los pasos detallados para validar que la librería de componentes funciona correctamente.

## Pasos para la validación:

1. **Montar temporalmente el Demo:**
   - Importar `DemoComponents` en `App.jsx` y renderizarlo al inicio de la página para comprobar visualmente todos los estados de los componentes.

2. **Verificar el componente `Button`:**
   - **Solo Texto**: El botón debe mostrar únicamente la cadena de texto asignada ("Solo Texto").
   - **Solo Ícono**: El botón debe mostrar únicamente el icono ("fa-solid fa-rotate" o "🛒").
   - **Texto + Ícono**: Debe mostrar ambos elementos según la propiedad `iconPosition` (ej. icono a la izquierda o derecha del texto).
   - **Advertencia de Accesibilidad**: Si se renderiza un botón con icono pero sin `ariaLabel` ni `title`, verificar que en la Consola de Desarrollador del Navegador se muestre el warning: `[Button Warning]: El botón con ícono ... no tiene 'ariaLabel' ni 'title'.`
   - **Badges**: El botón de carrito debe mostrar la insignia del badge con la cantidad exacta de productos arriba a la derecha.

3. **Verificar el componente `TextBox`:**
   - Validar que el icono izquierdo y el derecho se muestren correctamente alineados dentro del input.
   - Probar que al ingresar valores se actualice el estado local.
   - Verificar que al activar la propiedad `error={true}`, el borde cambie a rojo y muestre el `helperText` con estilo de error.

4. **Verificar el componente `ComboBox`:**
   - Comprobar que se carguen las opciones provistas y que al cambiar la selección se ejecute el handler correspondiente.
   - Validar el soporte para etiquetas y helper text.
