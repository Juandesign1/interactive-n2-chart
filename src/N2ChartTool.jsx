import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialFunctions = Array.from({ length: 10 }, (_, i) => `Function ${String.fromCharCode(65 + i)}`);

function calculateDensityOrder(matrix) {
  const n = matrix.length;
  const weightedMatrix = Array(n)
    .fill(null)
    .map(() => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      weightedMatrix[i][j] = matrix[i][j] + matrix[j][i];
    }
  }

  const order = [0];
  const remaining = new Set(Array.from({ length: n }, (_, i) => i).slice(1));

  while (remaining.size) {
    let bestNode = null;
    let bestScore = -Infinity;
    let bestPosition = 0;

    for (let node of remaining) {
      for (let pos = 0; pos <= order.length; pos++) {
        const left = pos > 0 ? weightedMatrix[node][order[pos - 1]] : 0;
        const right = pos < order.length ? weightedMatrix[node][order[pos]] : 0;
        const score = left + right;

        if (score > bestScore) {
          bestScore = score;
          bestNode = node;
          bestPosition = pos;
        }
      }
    }

    order.splice(bestPosition, 0, bestNode);
    remaining.delete(bestNode);
  }

  return order;
}

function reorderMatrix(matrix, order) {
  return order.map((i) => order.map((j) => matrix[i][j]));
}

export default function N2ChartTool() {
  const [functions, setFunctions] = useState(initialFunctions);
  const [matrix, setMatrix] = useState(
    Array(initialFunctions.length)
      .fill(null)
      .map(() => Array(initialFunctions.length).fill(0))
  );

  const modifyConnection = (i, j, increment = 1) => {
    const newMatrix = matrix.map((row) => [...row]);
    newMatrix[i][j] = Math.max(0, newMatrix[i][j] + increment);
    setMatrix(newMatrix);
  };

  const optimizeOrder = () => {
    const order = calculateDensityOrder(matrix);
    const reorderedMatrix = reorderMatrix(matrix, order);
    const reorderedFunctions = order.map((i) => functions[i]);
    setMatrix(reorderedMatrix);
    setFunctions(reorderedFunctions);
  };

  const resetMatrix = () => {
    const reset = Array(initialFunctions.length).fill(null).map(() => Array(initialFunctions.length).fill(0));
    setMatrix(reset);
    setFunctions(initialFunctions);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Add Function"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const name = e.target.value.trim();
              if (name) {
                const newFunctions = [...functions, name];
                const newMatrix = matrix.map((row) => [...row, 0]);
                newMatrix.push(Array(newFunctions.length).fill(0));
                setFunctions(newFunctions);
                setMatrix(newMatrix);
                e.target.value = "";
              }
            }
          }}
        />
        <Button onClick={optimizeOrder}>Optimize Density</Button>
        <Button variant="outline" onClick={resetMatrix}>Reset</Button>
      </div>

      <table className="border-collapse border border-gray-500 relative">
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                      className={`border border-gray-500 text-center cursor-pointer relative w-20 h-16 text-sm leading-tight ${cell ? "bg-green-200 text-black font-semibold" : ""}`}
                  onClick={(e) => {
                    if (e.shiftKey) {
                      modifyConnection(i, j, -1);
                    } else {
                      modifyConnection(i, j, 1);
                    }
                  }}
                >
                  {i === j ? functions[i] : cell > 0 ? cell : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-sm text-blue">
        Click a cell to increment (Shift+Click to decrement). Function names shown only on the diagonal.
      </p>
    </div>
  );
}