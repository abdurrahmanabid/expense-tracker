export const fields = [
  {
    name: "amount",
    label: "Amount",
    type: "number",
    placeholder: "Enter amount",
    required: true,
    width: "w-full",
  },
  {
    name: "dateTime",
    label: "Date & Time",
    type: "datetime-local",
    required: true,
    width: "w-full",
  },
  {
    name: "category",
    label: "Category",
    type: "select",
    options: [
      "Food",
      "Transportation",
      "Shopping",
      "Utilities",
      "Entertainment",
      "Other",
    ],
    required: true,
    width: "w-full",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Add a brief description",
    required: false,
    width: "w-full",
  },
];