<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor version="1.0.0"
    xmlns="http://www.opengis.net/sld"
    xmlns:ogc="http://www.opengis.net/ogc"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.opengis.net/sld https://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd">
    <NamedLayer>
        <!-- Nom publié par le service WMS du workspace ars. -->
        <Name>ambu_cds_bcg_2023</Name>
        <UserStyle>
            <Name>cluster</Name>
            <Title>Centre de santé avec consultation MG : regroupement de points</Title>
            <Abstract>Regroupement dans des cellules de 100 pixels, avec affichage du nombre de points par groupe.</Abstract>
            <FeatureTypeStyle>
                <!-- https://docs.geoserver.org/main/en/user/styling/ysld/reference/transforms/#point-stacker -->
                <Transformation>
                    <ogc:Function name="vec:PointStacker">
                        <ogc:Function name="parameter">
                            <ogc:Literal>data</ogc:Literal>
                        </ogc:Function>
                        <ogc:Function name="parameter">
                            <ogc:Literal>cellSize</ogc:Literal>
                            <ogc:Literal>100</ogc:Literal>
                        </ogc:Function>
                        <ogc:Function name="parameter">
                            <ogc:Literal>outputBBOX</ogc:Literal>
                            <ogc:Function name="env">
                                <ogc:Literal>wms_bbox</ogc:Literal>
                            </ogc:Function>
                        </ogc:Function>
                        <ogc:Function name="parameter">
                            <ogc:Literal>outputWidth</ogc:Literal>
                            <ogc:Function name="env">
                                <ogc:Literal>wms_width</ogc:Literal>
                            </ogc:Function>
                        </ogc:Function>
                        <ogc:Function name="parameter">
                            <ogc:Literal>outputHeight</ogc:Literal>
                            <ogc:Function name="env">
                                <ogc:Literal>wms_height</ogc:Literal>
                            </ogc:Function>
                        </ogc:Function>
                    </ogc:Function>
                </Transformation>
                <Rule>
                    <Name>points</Name>
                    <Title>Points regroupés</Title>
                    <PointSymbolizer>
                        <Geometry>
                            <ogc:PropertyName>geom</ogc:PropertyName>
                        </Geometry>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#EE0000</CssParameter>
                                </Fill>
                            </Mark>
                            <Size>
                                <ogc:Mul>
                                    <ogc:Literal>8</ogc:Literal>
                                    <ogc:Function name="sqrt">
                                        <ogc:PropertyName>count</ogc:PropertyName>
                                    </ogc:Function>
                                </ogc:Mul>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </Rule>
                <Rule>
                    <Name>effectifs</Name>
                    <Title>Nombre de points par groupe</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsGreaterThan>
                            <ogc:PropertyName>count</ogc:PropertyName>
                            <ogc:Literal>1</ogc:Literal>
                        </ogc:PropertyIsGreaterThan>
                    </ogc:Filter>
                    <TextSymbolizer>
                        <Geometry>
                            <ogc:PropertyName>geom</ogc:PropertyName>
                        </Geometry>
                        <Label>
                            <ogc:PropertyName>count</ogc:PropertyName>
                        </Label>
                        <Font>
                            <CssParameter name="font-family">Arial</CssParameter>
                            <CssParameter name="font-size">10</CssParameter>
                            <CssParameter name="font-weight">bold</CssParameter>
                        </Font>
                        <LabelPlacement>
                            <PointPlacement>
                                <AnchorPoint>
                                    <AnchorPointX>0.5</AnchorPointX>
                                    <AnchorPointY>0.75</AnchorPointY>
                                </AnchorPoint>
                            </PointPlacement>
                        </LabelPlacement>
                        <Fill>
                            <CssParameter name="fill">#FFFFFF</CssParameter>
                        </Fill>
                    </TextSymbolizer>
                </Rule>
            </FeatureTypeStyle>
        </UserStyle>
    </NamedLayer>
</StyledLayerDescriptor>
