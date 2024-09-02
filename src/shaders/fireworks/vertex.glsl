uniform float uSize;
uniform vec2 uResolution;
uniform float uProgress;

attribute float aSize;
attribute float aTimeMultiplier;
attribute float aTrailOffset;

float remap(float value, float originMin, float originMax, float destinationMin, float destinationMax)
{
    return destinationMin + (value - originMin) * (destinationMax - destinationMin) / (originMax - originMin);
}

void main ()
{
    // Usar uProgress directamente para todas las partículas, asegurando que todas exploten al mismo tiempo
    float progress = uProgress * aTimeMultiplier;

    // Factor para reducir el progreso de las partículas del trail para que se detengan antes
    float stopFactor = 1.0 - aTrailOffset * 0.7; 
    progress *= stopFactor;

    vec3 newPosition = position;

    // Explosión inicial
    float explodingProgress = remap(progress, 0.0, 0.3, 0.0, 1.0);
    explodingProgress = clamp(explodingProgress, 0.0, 1.0);
    explodingProgress = 1.0 - (pow(1.0 - explodingProgress, 3.0));
    newPosition *= explodingProgress;

    // Agregar una curva en el eje Y para simular la gravedad
    float explodingCurveProgress = remap(progress, 0.0, 0.1, 0.0, 0.18);
    explodingCurveProgress = -5.0 * explodingCurveProgress; 
    explodingCurveProgress = clamp(explodingCurveProgress, -2.0, 1.0);
    newPosition.y += explodingCurveProgress * 0.4;

    // Caída
    float fallingProgress = remap(progress, 0.1, 1.0, 0.0, 1.0);
    fallingProgress = clamp(fallingProgress, 0.0, 1.0);
    fallingProgress = 1.0 - (pow(1.0 - fallingProgress, 3.0));
    newPosition.y -= fallingProgress * 0.2;

    // Ajuste de tamaño
    float sizeOpeningProgress = remap(progress, 0.0, 0.125, 0.0, 1.0);
    float sizeClosingProgress = remap(progress, 0.125, 1.0, 1.0, 0.0);
    float sizeProgress = min(sizeOpeningProgress, sizeClosingProgress);
    sizeProgress = clamp(sizeProgress, 0.0, 1.0);

    // Twinkling
    float twinklingProgress = remap(progress, 0.2, 0.8, 0.0, 1.0);
    twinklingProgress = clamp(twinklingProgress, 0.0, 2.0);
    float sizeTwinkling = sin(progress * 50.0) * 1.5 + 1.5;
    sizeTwinkling = 1.0 - sizeTwinkling * twinklingProgress;

    // Posición final en espacio de modelo, vista y proyección
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
    
    // Ajuste de tamaño de punto
    gl_PointSize = uSize * uResolution.y * aSize * sizeProgress * sizeTwinkling;
    gl_PointSize *= 1.0 / -viewPosition.z;

    // Control de desaparición de puntos muy pequeños
    if (gl_PointSize < 1.0)
        gl_Position = vec4(9999.9);
}
