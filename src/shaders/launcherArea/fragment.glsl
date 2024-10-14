varying vec2 vUv;

void main()
{
    // Relación de aspecto del plano (5x1.5)
    vec2 aspectRatio = vec2(1.5 / 5.0, 1.0); // Relación de aspecto del plano
    
    // Ajustamos las coordenadas UV para compensar la relación de aspecto
    vec2 uv = (vUv - 0.5) * aspectRatio + 0.5;

    // Definir el grosor deseado para las líneas
    float lineThickness = 0.08; // Grosor de la línea ajustado

    // Crear las líneas alrededor de los bordes
    float borderX = step(0.22 - lineThickness, abs(uv.x - 0.5)); // Borde en X
    float borderY = step(0.5 - lineThickness, abs(uv.y - 0.5)); // Borde en Y

    // Combinar los bordes X e Y para formar el rectángulo con grosor uniforme
    float strength = max(borderX, borderY);

    // Dibujar el rectángulo amarillo
    gl_FragColor = vec4(1.0, 1.0, 0.0, strength);
}
