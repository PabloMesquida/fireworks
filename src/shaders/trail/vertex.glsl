#include ../utils/remap.glsl

uniform float uSize;
uniform vec2 uResolution;
uniform float uProgress;

attribute vec3 aEndPosition;
attribute float aTimeMultiplier;
attribute float aTrailOffset;

void main()
{
    // Posición inicial del vértice
    vec3 startPosition = position;

    // Posición final del vértice
    vec3 endPosition = aEndPosition;

    // Aseguramos que el progreso esté entre 0 y 1
    float progress = clamp(uProgress, 0.0, 1.0);

    // Factor para reducir el progreso de las partículas del trail para que se detengan antes
    float stopFactor = 1.0 - aTrailOffset * 0.7; 
    progress *= stopFactor;

    // Aplicamos una curva de suavizado al progreso para una animación más fluida
    float easedProgress = 1.0 - pow(1.0 - progress, 3.0);

    // Interpolamos entre la posición inicial y final
    vec3 newPosition = mix(startPosition, endPosition, easedProgress);

    // Transformaciones estándar del modelo
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

    // Calculamos el tamaño del punto en función de la resolución y la distancia a la cámara
    gl_PointSize = uSize * (uResolution.y / -viewPosition.z);

    // Controlamos la desaparición de puntos muy pequeños
    if (gl_PointSize < 1.0)
        gl_Position = vec4(9999.9);
}
