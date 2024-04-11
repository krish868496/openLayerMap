"use client";
import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Draw, Modify } from "ol/interaction";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { getArea, getLength } from "ol/sphere";

const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  let areaTooltip: HTMLDivElement | null = null;
  let lengthTooltip: HTMLDivElement | null = null;

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    map.addLayer(vectorLayer);

    const modifyInteraction = new Modify({
      source: vectorSource,
    });
    map.addInteraction(modifyInteraction);

    const createTooltip = () => {
      const tooltip = document.createElement("div");
      tooltip.className = "ol-tooltip";
      document.body.appendChild(tooltip);
      return tooltip;
    };

    const removeTooltip = () => {
      if (areaTooltip) {
        document.body.removeChild(areaTooltip);
        areaTooltip = null;
      }
      if (lengthTooltip) {
        document.body.removeChild(lengthTooltip);
        lengthTooltip = null;
      }
    };

    const displayArea = (polygon: any) => {
      if (!areaTooltip) areaTooltip = createTooltip();
      const area = getArea(polygon, {
        projection: map.getView().getProjection(),
      });
      areaTooltip.innerHTML = `Area: ${area.toFixed(2)} m²`;
    };

    const displayLength = (line: any) => {
      if (!lengthTooltip) lengthTooltip = createTooltip();
      const length = getLength(line, {
        projection: map.getView().getProjection(),
      });
      lengthTooltip.innerHTML = `Length: ${length.toFixed(2)} m`;
    };

    const draw = new Draw({
      source: vectorSource,
      type: "Polygon",
    });
    map.addInteraction(draw);

    draw.on("drawstart", (event: any) => {
      areaTooltip = createTooltip();
      event.feature.on("change", () => {
        const polygon = event.feature.getGeometry();
        displayArea(polygon);
      });
    });

    draw.on("drawend", () => {
      removeTooltip();
    });

    const drawLine = new Draw({
      source: vectorSource,
      type: "LineString",
    });                                                                                    
    map.addInteraction(drawLine);

    drawLine.on("drawstart", (event: any) => {
      lengthTooltip = createTooltip();
      event.feature.on("change", () => {
        const line = event.feature.getGeometry();
        displayLength(line);
      });
    });

    drawLine.on("drawend", () => {
      removeTooltip();
    });

    return () => {
      map.setTarget(undefined);
      map.removeInteraction(draw);
      map.removeInteraction(drawLine);
      map.removeInteraction(modifyInteraction);
      removeTooltip();
    };
  }, []);

  return <div ref={mapRef} className="w-screen h-screen mt-0"></div>;
};

export default MapComponent;
