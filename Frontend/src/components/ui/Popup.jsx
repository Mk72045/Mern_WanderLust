import { BlackButton, RedButton } from "./Button";

import { useForm } from "react-hook-form";

function Popup({
  apiCall = async () => {},
  open = false,
  onClose = () => {},
  message = "Are you sure you want to delete this task?",
  focus = "delete",
}) {
  const { handleSubmit } = useForm();

  async function handleDelete() {
    await apiCall();
    onClose();
  }

  function handleCancel() {
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{message}</h2>

          <p className="mt-2 text-sm text-gray-500">
            This action cannot be undone.
          </p>
        </div>

        <form onSubmit={handleSubmit(handleDelete)}>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <BlackButton
              text="Cancel"
              type="button"
              onClick={handleCancel}
              autoFocus={focus === "cancel"}
              style="w-full sm:w-auto px-5"
            />

            <RedButton
              text="Delete"
              type="submit"
              autoFocus={focus === "delete"}
              style="w-full sm:w-auto px-5"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Popup;
