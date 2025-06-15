import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Papa from "papaparse";
import "./App.css";

function App() {
  const [dashboardData, setDashboardData] = useState([]);
  const [colorBy, setColorBy] = useState("sirna_id");
  const [filterValue, setFilterValue] = useState("All");

  useEffect(() => {
    Papa.parse("/dashboard_data.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        setDashboardData(results.data);
      },
    });
  }, []);

  const getPlotData = () => {
    let filtered = dashboardData;
     if (filterValue !== "All") {
  filtered = dashboardData.filter((d) => String(d[colorBy]) === String(filterValue));
}


    return [
      {
        x: filtered.map((d) => d.tsne_1),
        y: filtered.map((d) => d.tsne_2),
        text: filtered.map(
          (d) =>
            `True: ${d.sirna_id}<br>Pred: ${d.predicted}<br>Exp: ${d.experiment}<br>Plate: ${d.plate}`
        ),
        type: "scatter",
        mode: "markers",
        marker: {
          color: filtered.map((d) => d[colorBy]),
          size: 6,
          opacity: 0.7,
          colorscale: "Viridis",
          showscale: true,
        },
      },
    ];
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h3>ℹ️ About BioStack</h3>
        <p><b>Model:</b> LightGBM</p>
        <p><b>Accuracy:</b> 95%</p>
        <p><b>F1 Score (Macro Avg):</b> 95%</p>
        <p><b>Test Size:</b> 1,000 samples from 20 high-frequency siRNA classes</p>
        <p>
          This dashboard visualizes t-SNE-reduced 128D image embeddings from the RxRx1 dataset. You can explore class separability, predictions, and experimental structure.
        </p>
        <hr />
        <p><b>Usage Tips:</b></p>
        <ul>
          <li>Select how to color the points</li>
          <li>Use the filter to isolate a label</li>
          <li>Hover for prediction and metadata</li>
        </ul>
      </aside>

      <main className="main">
        <div className="intro">
          <h1>🧬 BioStack: RxRx1 Embedding Classifier</h1>
          <p>
            Visualize RxRx1 embeddings projected into 2D using t-SNE. Hover for class and metadata. Color and filter options let you drill into specific experimental structure or prediction performance.
          </p>
        </div>

        <div className="controls">
          <label>🎨 Color by:</label>
          <select onChange={(e) => setColorBy(e.target.value)} value={colorBy}>
            <option value="sirna_id">True Label</option>
            <option value="predicted">Predicted Label</option>
            <option value="experiment">Experiment</option>
            <option value="plate">Plate</option>
          </select>

          <div style={{ marginTop: "10px", marginBottom: "20px" }}>
            <label>🔍 Filter by class:</label>
            <select onChange={(e) => setFilterValue(e.target.value)} value={filterValue}>
              <option value="All">All</option>
              {Array.from(new Set(dashboardData.map((row) => row[colorBy])))
                .sort()
                .map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <Plot
          data={getPlotData()}
          layout={{
            title: "t-SNE Visualization",
            height: 700,
            width: 1000,
            margin: { l: 40, r: 40, b: 40, t: 40 },
          }}
        />
      </main>
    </div>
  );
}

export default App;
