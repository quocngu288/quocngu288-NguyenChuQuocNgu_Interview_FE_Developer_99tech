export default function NavSteps({ steps }) {
  return (
    <ol class="flex items-center justify-center w-full p-3 mb-6 space-x-2 text-sm font-medium text-center text-gray-500 bg-white dark:text-gray-400 sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse">
      {steps.map((item) => {
        return (
          <li
            key={item.id}
            className={`flex items-center ${
              item.active ? "text-blue-600 dark:text-blue-500" : ""
            }`}
          >
            <span
              className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${
                item.active
                  ? "border-blue-600 dark:border-blue-500"
                  : "border-gray-600 dark:border-gray-500"
              }`}
            >
              {item.id}
            </span>
            {item.text}
            {/* <span class="hidden sm:inline-flex sm:ms-2">Info</span> */}
            {steps[steps.length - 1].id !== item.id && (
              <svg
                class="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 12 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m7 9 4-4-4-4M1 9l4-4-4-4"
                />
              </svg>
            )}
          </li>
        );
      })}
    </ol>
  );
}
