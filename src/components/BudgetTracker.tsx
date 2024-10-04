import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { useBudget } from "../hooks/useBudget"
import AmountDisplay from "./AmountDisplay"

export default function BudgetTracker() {
  const { state, totalExpenses, remainingBudget, dispatch } = useBudget()
  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4 sm:p-6">
      {/* Progreso Circular */}
      <div className="flex justify-center mx-auto">
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: percentage === 100 ? "#DC2626" : "#334155",
            trailColor: "#F5F5F5",
            textSize: 9,
            textColor: percentage === 100 ? "#DC2626" : "#334155",
          })}
          text={`${percentage}% Gastado`}
        />
      </div>

      {/* Información del presupuesto */}
      <div className="flex flex-col justify-center items-center mx-auto gap-4 sm:gap-6">
        <button
          className="bg-slate-700 hover:bg-slate-600 w-full p-2 text-white uppercase font-bold rounded-lg"
          type="button"
          onClick={() => dispatch({ type: "reset-app" })}
        >
          Reset
        </button>

        {/* Mostrar cantidades */}
        <div className="space-y-4 sm:space-y-6">
          <AmountDisplay label="Presupuesto" amount={state.budget} />
          <AmountDisplay label="Disponible" amount={remainingBudget} />
          <AmountDisplay label="Gastado" amount={totalExpenses} />
        </div>
      </div>
    </div>
  )
}
