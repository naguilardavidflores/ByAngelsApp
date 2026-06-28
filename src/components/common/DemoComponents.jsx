import React, { useState } from 'react';
import Button from './Button';
import TextBox from './TextBox';
import ComboBox from './ComboBox';
import Badge from './Badge';

/**
 * Componente Demo para probar visualmente la biblioteca de componentes comunes en español.
 */
function DemoComponents() {
  const [textVal1, setTextVal1] = useState('');
  const [textVal2, setTextVal2] = useState('');
  const [selectVal, setSelectVal] = useState('es');

  const options = [
    { value: 'es', label: 'Español' },
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'Français' }
  ];

  return (
    <div style={{ padding: '32px', maxWidth: '800px', margin: '0 auto', background: '#ebd2c9', borderRadius: '16px', color: '#3d221a' }}>
      <h2 style={{ marginBottom: '24px', fontFamily: 'Outfit, sans-serif' }}>Demostración y Pruebas Unitarias Visuales</h2>
      
      {/* Sección de Botones */}
      <section style={{ marginBottom: '32px', background: 'rgba(253, 245, 242, 0.5)', padding: '20px', borderRadius: '12px' }}>
        <h3 style={{ marginBottom: '16px' }}>1. Componente: Button</h3>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          {/* Botón con solo texto */}
          <Button text="Solo Texto" onClick={() => alert('Solo Texto Clicked')} />

          {/* Botón con texto + icono izquierdo */}
          <Button 
            text="Buscar" 
            icon="fa-solid fa-magnifying-glass" 
            onClick={() => alert('Buscar Clicked')} 
          />

          {/* Botón con texto + icono derecho */}
          <Button 
            text="Siguiente" 
            icon="fa-solid fa-arrow-right" 
            iconPosition="right" 
            onClick={() => alert('Siguiente Clicked')} 
          />

          {/* Botón con solo icono y ariaLabel */}
          <Button 
            icon="fa-solid fa-rotate" 
            ariaLabel="Rotar Pose" 
            variant="rotate-icon"
            onClick={() => alert('Rotar Clicked')} 
          />

          {/* Advertencia en consola de missing ariaLabel (revisar la consola del navegador) */}
          <Button 
            icon="fa-solid fa-warning" 
            variant="rotate-icon"
            onClick={() => alert('Advertencia en consola si falta ariaLabel')} 
          />

          {/* Botón con Badge */}
          <Button 
            text="Carrito" 
            icon="🛒" 
            badge={3} 
            onClick={() => alert('Carrito Clicked')} 
          />

          {/* Botón deshabilitado */}
          <Button 
            text="Deshabilitado" 
            disabled 
            onClick={() => alert('No debería ejecutarse')} 
          />
        </div>
      </section>

      {/* Sección de TextBox */}
      <section style={{ marginBottom: '32px', background: 'rgba(253, 245, 242, 0.5)', padding: '20px', borderRadius: '12px' }}>
        <h3 style={{ marginBottom: '16px' }}>2. Componente: TextBox</h3>
        
        <TextBox
          id="demo-txt-1"
          name="username"
          label="Nombre de Usuario (Obligatorio con Icono Izquierdo)"
          placeholder="Escribe tu nombre..."
          value={textVal1}
          onChange={(e) => setTextVal1(e.target.value)}
          leftIcon="fa-solid fa-user"
          required
        />

        <TextBox
          id="demo-txt-2"
          name="email"
          label="Correo Electrónico (Con Error)"
          placeholder="ejemplo@correo.com"
          value={textVal2}
          onChange={(e) => setTextVal2(e.target.value)}
          rightIcon="fa-solid fa-envelope"
          error={true}
          helperText="El formato del correo electrónico no es válido."
        />
      </section>

      {/* Sección de ComboBox */}
      <section style={{ marginBottom: '32px', background: 'rgba(253, 245, 242, 0.5)', padding: '20px', borderRadius: '12px' }}>
        <h3 style={{ marginBottom: '16px' }}>3. Componente: ComboBox</h3>
        
        <ComboBox
          id="demo-select-1"
          name="language"
          label="Selecciona tu Idioma"
          value={selectVal}
          options={options}
          onChange={(e) => setSelectVal(e.target.value)}
          helperText="Selecciona el idioma para traducir la interfaz."
        />
      </section>

      {/* Sección de Badges independientes */}
      <section style={{ background: 'rgba(253, 245, 242, 0.5)', padding: '20px', borderRadius: '12px' }}>
        <h3 style={{ marginBottom: '16px' }}>4. Componente: Badge (Independientes)</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Badge variant="primary">Nuevo</Badge>
          <Badge variant="secondary">Límite alcanzado</Badge>
          <Badge variant="rust">99+</Badge>
        </div>
      </section>
    </div>
  );
}

export default DemoComponents;
