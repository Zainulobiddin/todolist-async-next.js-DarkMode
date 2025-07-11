"use client"
import { DarkModeContext } from "@/app/context/DarkModeContext"
import {
  addCategories,
  deleteCategories,
  editCategories,
  getCategories,
} from "@/store/features/categories/categories-slice"
import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Category() {
  const { categories } = useSelector(({ categories }) => categories)
  const dispatch = useDispatch()
  const [nameCategory, setNameCategory] = useState("")
  const [nameEditCategory, setNameEditCategory] = useState("")
  const [idx, setIdx] = useState("")
  const [editModal, setEditModal] = useState(false)
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext)

  async function handleAdd() {
    await dispatch(addCategories(nameCategory))
    setNameCategory("")
  }

  function handleEdit(category) {
    setEditModal(!editModal)
    setNameEditCategory(category.name)
    setIdx(category.id)
  }

  function handleEditSave() {
    const newCategory = {
      name: nameEditCategory,
      id: idx,
    }
    dispatch(editCategories(newCategory))
    setNameEditCategory("")
    setEditModal(false)
  }

  function cancelEdit() {
    setNameEditCategory("")
    setEditModal(false)
  }

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 rounded-xl shadow-lg space-y-6 my-8 sm:my-10 bg-white dark:bg-gray-900">
      <div className="flex justify-end">
        <button
          onClick={toggleDarkMode}
          className="px-3 py-1.5 rounded-md bg-gray-300 dark:bg-gray-700 text-black dark:text-white text-sm sm:text-base font-medium"
        >
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>

      {/* Add Category Input */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <input
          type="text"
          placeholder="Add category"
          value={nameCategory}
          onChange={({ target }) => setNameCategory(target.value)}
          className="flex-grow px-3 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
        />
        <button
          onClick={handleAdd}
          className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition text-base"
        >
          + Add
        </button>
      </div>

      {/* Categories Table */}
      {categories && categories.length > 0 && (
        <div className="overflow-x-auto rounded-md border border-gray-300 dark:border-gray-700 shadow-md">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 text-sm sm:text-base">
              <tr>
                <th className="px-3 py-2 border dark:border-gray-700 w-12 sm:w-16">ID</th>
                <th className="px-3 py-2 border dark:border-gray-700">Name</th>
                <th className="px-3 py-2 border dark:border-gray-700 w-28 sm:w-40">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-900 dark:text-gray-100 text-sm sm:text-base">
              {categories.map((cat) => (
                <tr
                  key={cat.id}
                  className="bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors dark:bg-gray-900 dark:even:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <td className="px-3 py-2 border font-mono dark:border-gray-700 text-center">{cat.id}</td>
                  <td className="px-3 py-2 border dark:border-gray-700 truncate max-w-xs sm:max-w-none">{cat.name}</td>
                  <td className="px-3 py-2 border dark:border-gray-700">
                    <div className="flex gap-4 justify-center sm:justify-start items-center">
                      <button
                        onClick={() => dispatch(deleteCategories(cat.id))}
                        aria-label={`Delete category ${cat.name}`}
                        className="text-xl hover:text-red-600 transition"
                      >
                        ❌
                      </button>
                      <button
                        onClick={() => handleEdit(cat)}
                        className="text-blue-600 hover:text-blue-800 transition text-xl"
                        aria-label={`Edit category ${cat.name}`}
                      >
                        🖊
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && (
        <div className="mt-6 bg-gray-50 p-4 rounded-md shadow-inner space-y-4 dark:bg-gray-800 dark:text-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Edit Category</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Edit category name"
              value={nameEditCategory}
              onChange={({ target }) => setNameEditCategory(target.value)}
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
            <button
              onClick={cancelEdit}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleEditSave}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
