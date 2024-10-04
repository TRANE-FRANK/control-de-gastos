import { useEffect, useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterByCategory from "./components/FilterByCategory"

function App() {
  const { state } = useBudget()
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

  useEffect(() => {
    localStorage.setItem("budget", state.budget.toString())
    localStorage.setItem("expenses", JSON.stringify(state.expenses))
  }, [state])

  return (
    <>
      <header className="bg-zinc-800 w-full flex justify-center py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl uppercase text-center font-black text-white mx-4 sm:mx-5">
          Planificador de Gastos
        </h1>
      </header>

      <div className="max-w-3xl bg-white shadow-lg rounded-lg p-4 sm:p-6 mx-auto mt-4 sm:mt-5 space-x-4 sm:space-x-6">
        {isValidBudget ? (
          <div className="space-y-4 sm:space-y-6">
            <BudgetTracker />
          </div>
        ) : (
          <BudgetForm />
        )}
      </div>
      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-6 sm:py-10 px-4 sm:px-6 space-y-4 sm:space-y-6">
          <FilterByCategory />
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
    </>
  )
}

export default App
