void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;

    gl_PointSize = uSize * uResolution.y * aSize * sizeProgress * sizeTwinkling;
    gl_PointSize *= 1.0 / -viewPosition.z;

    // Control de desaparición de puntos muy pequeños
    if (gl_PointSize < 1.0)
        gl_Position = vec4(9999.9);
}

