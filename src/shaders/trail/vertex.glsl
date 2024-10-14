#include ../utils/remap.glsl

uniform float uSize;
uniform vec2 uResolution;
uniform float uProgress;

void main()
{
    vec3 newPosition = position;
    float progress = uProgress;
    
    float launcherProgress = remap(progress, 0.0, 1.0, 0.0, 1.0);
    launcherProgress = clamp(launcherProgress, 0.0, 1.0);
    launcherProgress = 1.0 - (pow(1.0 - launcherProgress, 3.0));
    newPosition *= launcherProgress;

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
    
    gl_PointSize = uSize * uResolution.y ;
    gl_PointSize *= 1.0 / -viewPosition.z;

    // Control de desaparición de puntos muy pequeños
    if (gl_PointSize < 1.0)
        gl_Position = vec4(9999.9);
}

