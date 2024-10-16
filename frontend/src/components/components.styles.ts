import clsx from "clsx";

export const ModalClassesBG = clsx(
  "fixed",
  "inset-0",
  "flex",
  "items-center",
  "justify-center",
  "h-full",
  "w-full",
  "bg-black",
  "bg-opacity-50",
  "z-30"
);

export const RegisterModalClasses = clsx(
  "flex",
  "md:rounded-lg",
  "md:shadow-2xl",
  "md:w-[1000px]",
  "md:h-[700px]",
  "xl:w-[1150px]",
  "h-full",
  "w-full",
  "z-30"
);

export const LoginModalClasses = clsx(
  "relative",
  "h-full",
  "w-full",
  "bg-white",
  "rounded-lg",
  "shadow-2xl",
  "sm:w-[450px]",
  "sm:h-[720px]",
  "px-16",
  "z-30",
  "pt-4"
);

export const InputOuterDiv = clsx("w-80", "md:w-auto", "mx-auto", "md:mx-0");

export const InputInnerDiv = clsx(
  "relative",
  "w-full",
  "min-w-[200px]",
  "h-10"
);

export const InputFieldClasses = clsx(
  "peer",
  "w-full",
  "h-full",
  "bg-transparent",
  "text-blue-gray-700",
  "font-sans",
  "font-normal",
  "outline",
  "outline-0",
  "focus:outline-0",
  "disabled:bg-blue-gray-50",
  "transition-all",
  "placeholder-shown:border",
  "placeholder-shown:border-primary",
  "placeholder-shown:border-t-blue-gray-200",
  "border",
  "focus:border-2",
  "border-t-transparent",
  "focus:border-t-transparent",
  "text-sm",
  "px-3",
  "py-2.5",
  "rounded-[7px]",
  "border-primary",
  "focus:border-primary"
);

const LabelbaseClasses = clsx(
  "flex",
  "w-full",
  "h-full",
  "select-none",
  "pointer-events-none",
  "absolute",
  "left-0",
  "font-normal",
  "!overflow-visible",
  "truncate",
  "peer-placeholder-shown:text-primary",
  "leading-tight",
  "peer-focus:leading-tight",
  "transition-all",
  "-top-1.5",
  "peer-placeholder-shown:text-sm",
  "text-[11px]",
  "peer-focus:text-[11px]",
  "peer-placeholder-shown:leading-[3.75]",
  "text-gray-500",
  "peer-focus:text-gray-500"
);

const LabelbeforeClasses = clsx(
  "before:content[' ']",
  "before:block",
  "before:box-border",
  "before:w-2.5",
  "before:h-1.5",
  "before:mt-[6.5px]",
  "before:mr-1",
  "peer-placeholder-shown:before:border-transparent",
  "before:rounded-tl-md",
  "before:border-t",
  "peer-focus:before:border-t-2",
  "before:border-l",
  "peer-focus:before:border-l-2",
  "before:pointer-events-none",
  "before:transition-all",
  "before:border-primary",
  "peer-focus:before:!border-gray-900"
);

const LabelafterClasses = clsx(
  "after:content[' ']",
  "after:block",
  "after:flex-grow",
  "after:box-border",
  "after:w-2.5",
  "after:h-1.5",
  "after:mt-[6.5px]",
  "after:ml-1",
  "peer-placeholder-shown:after:border-transparent",
  "after:rounded-tr-md",
  "after:border-t",
  "peer-focus:after:border-t-2",
  "after:border-r",
  "peer-focus:after:border-r-2",
  "after:pointer-events-none",
  "after:transition-all",
  "after:border-primary",
  "peer-focus:after:!border-primary"
);

export const InputLabel = clsx(
  LabelbaseClasses,
  LabelbeforeClasses,
  LabelafterClasses
);

export const RegisterBlueDiv = clsx(
  "bg-primary",
  "text-white",
  "px-10",
  "py-4",
  "rounded-l-lg",
  " absolute",
  "inset-0",
  "flex",
  "pt-60",
  "px-10"
);

export const RegisterWhiteDiv = clsx(
  "relative w-full h-11/12 bg-white md:rounded-r-lg md:basis-8/12 pt-10 pl-12 pr-10"
);

export const MobileMenuClasses = clsx(
  "relative",
  "inline-flex",
  "items-center",
  "justify-center",
  "rounded-md",
  "p-2",
  "text-white",
  "hover:bg-gray-700",
  "hover:text-white",
  "focus:outline-none",
  "focus:ring-2",
  "focus:ring-inset",
  "focus:ring-white"
);

export const NavLinkContainer = clsx(
  "flex",
  "flex-1",
  "items-center",
  "justify-center",
  "sm:items-stretch",
  "md:justify-start"
);

export const NavLink = clsx("text-white", "hover:text-gray-300", "pt-2");

export const NavLinkSpecial = clsx(
  "text-white",
  "hover:bg-primary_light",
  "font-bold",
  "bg-primary",
  "px-2",
  "border-primary"
);

export const NotificationButtonMobileClasses = clsx(
  "relative",
  "rounded-full",
  "bg-primary",
  "p-1",
  "text-white",
  "hover:text-white",
  "focus:outline-none",
  "focus:ring-2",
  "focus:ring-white",
  "focus:ring-offset-2",
  "focus:ring-offset-primary_test"
);

export const NotificationButtonClasses = clsx(
  "relative",
  "rounded-full",
  "bg-primary",
  "p-1",
  "text-white",
  "hover:text-white",
  "focus:outline-none",
  "focus:ring-2",
  "focus:ring-white",
  "focus:ring-offset-2",
  "focus:ring-offset-primary_test"
);

export const MobileLinkClasses = clsx(
  "text-gray-300",
  "hover:bg-gray-700",
  "hover:text-white",
  "block",
  "rounded-md",
  "px-3",
  "py-2",
  "text-base",
  "font-medium"
);

export const PrimaryButtonClass = clsx(
  "focus:outline-none",
  "text-primary",
  "font-times",
  "bg-white",
  "hover:bg-primary",
  "hover:ring-1",
  "hover:text-white",
  "hover:ring-white",
  "focus:ring-4",
  "focus:ring-primary_test",
  "font-medium",
  "rounded-lg",
  "lg:text-sm",
  "text-xs",
  "px-5",
  "py-2",
  "me-2",
  "mb-2",
  "dark:focus:ring-white"
);

export const SecondaryButtonClass = clsx(
  "focus:outline-none",
  "text-white",
  "bg-primary",
  "hover:bg-white",
  "hover:text-black",
  "focus:ring-4",
  "focus:ring-white-300",
  "font-medium",
  "rounded-lg",
  "text-sm",
  "px-6",
  "py-2",
  "me-2",
  "mb-2",
  "dark:focus:ring-white-900",
  "border",
  "border-white-800"
);

export const SolidButtonClasses = clsx(
  "bg-primary",
  "px-5",
  "min-w-64",
  "hover:bg-primary_test",
  "align-middle",
  "select-none",
  "font-sans",
  "font-bold",
  "text-center",
  "uppercase",
  "transition-all",
  "disabled:shadow-none",
  "disabled:pointer-events-none",
  "text-xs",
  "py-3",
  "px-16",
  "rounded-lg",
  "bg-accent",
  "text-white",
  "shadow-md",
  "shadow-gray-900/10",
  "hover:shadow-lg",
  "hover:shadow-gray-900/20"
);

export const SvgButtonClasses = clsx(
  "bg-primary",
  "px-5",
  "min-w-64",
  "hover:bg-primary_test",
  "align-middle",
  "select-none",
  "font-sans",
  "font-bold",
  "text-center",
  "uppercase",
  "transition-all",
  "disabled:shadow-none",
  "disabled:pointer-events-none",
  "text-xs",
  "py-3",
  "px-16",
  "rounded-lg",
  "bg-accent",
  "text-white",
  "shadow-md",
  "shadow-gray-900/10",
  "hover:shadow-lg",
  "hover:shadow-gray-900/20",
  "focus:opacity-[0.85]",
  "focus:shadow-none",
  "active:opacity-[0.85]",
  "active:shadow-none"
);

export const CloseButtonClasses = clsx(
  "absolute",
  "top-0",
  "right-0",
  "text-gray-400",
  "bg-transparent",
  "hover:bg-gray-200",
  "hover:text-gray-900",
  "rounded-lg",
  "text-sm",
  "w-8",
  "h-8",
  "ms-auto",
  "inline-flex",
  "justify-center",
  "items-center"
);

export const CourseCardOuterClasses = clsx(
  "relative",
  "flex",
  "w-full",
  "max-w-[20rem]",
  "lg:max-w-[26rem]",
  "flex-col",
  "rounded-xl",
  "bg-white",
  "bg-clip-border",
  "text-gray-700",
  "shadow-lg",
  "h-[350px]" 
);

export const CourseCardImageContainerClsx = clsx(
  "relative",
  "lg:mx-1",
  "mt-1",
  "overflow-hidden",
  "text-white",
  "shadow-lg",
  "rounded-xl",
  "bg-blue-gray-500",
  "bg-clip-border",
  "shadow-blue-gray-500/40",
  "h-[150px]" // Fixed height for the image container
);

export const CourseCardImageClsx = clsx(
  "absolute",
  "inset-0",
  "w-full",
  "h-full",
  "object-cover", // Ensure the image covers the container
  "bg-gradient-to-tr",
  "from-transparent",
  "via-transparent",
  "to-black/60"
);

export const CourseCardTitleContainerClsx = clsx(
  "flex",
  "items-center",
  "justify-between",
  "h-[60px]", // Fixed height for title container
  "w-full"
);

export const CourseCardTitle = clsx(
  "block",
  "font-sans",
  "text-lg", // Slightly reduced font size
  "antialiased",
  "font-medium",
  "leading-snug",
  "tracking-normal",
  "text-blue-gray-900"
);

export const CourseCardDescription = clsx(
  "block",
  "font-sans",
  "text-sm", // Reduced font size
  "antialiased",
  "text-grey-700",
  "font-light",
  "overflow-hidden" ,// Hide overflow text
  "min-h-[50px]", // Fixed height for description
  "mb-6"
);
export const interestCloseButtonClasses = clsx(
  "text-gray-400",
  "bg-transparent",
  "hover:bg-gray-200",
  "hover:text-gray-900",
  "rounded-lg",
  "text-sm",
  "w-6",
  "h-7",
  "justify-end",
  "items-center",
  "ml-3"
);

export const EditProfileModalClasses = clsx(
  "relative",
  "h-full",
  "w-full",
  "bg-white",
  "rounded-lg",
  "shadow-2xl",
  "sm:w-[500px]",
  "sm:h-[800px]",
  "px-16",
  "pt-4"
);

export const XpCardModalClasses = clsx(
  "relative",
  "h-full",
  "w-full",
  "bg-white",
  "rounded-lg",
  "shadow-2xl",
  "sm:w-[400px]",
  "sm:h-auto",
  "pt-10"
);

export const ProfileBackground = clsx(
  "relative",
  "bg-white",
  "min-h-[800px]",
  "w-full",
  "sm:w-7/12",
  "sm:ml-40",
  "lg:ml-48",
  "rounded-lg",
  "shadow-md",
  "py-14",
  "flex",
  "flex-col",
  "items-center",
  "justify-center"
);

export const DeleteButtonClasses = clsx(
  "bg-button_yellow",
  "px-5",
  "min-w-64",
  "hover:bg-red-500",
  "hover:text-white",
  "align-middle",
  "select-none",
  "font-sans",
  "font-bold",
  "text-center",
  "uppercase",
  "transition-all",
  "disabled:opacity-90",
  "disabled:shadow-none",
  "disabled:pointer-events-none",
  "text-xs",
  "py-3",
  "px-16",
  "rounded-lg",
  "bg-accent",
  "text-red-500",
  "shadow-md",
  "shadow-gray-900/10",
  "hover:shadow-lg",
  "hover:shadow-gray-900/20"
);

export const EditButtonClasses = clsx(
  "focus:outline-none",
  "text-primary",
  "font-medium",
  "font-times",
  "bg-white",
  "hover:ring-1",
  "hover:ring-white",
  "focus:ring-4",
  "focus:ring-primary_test",
  "font-medium",
  "rounded-lg",
  "text-md",
  "px-3",
  "py-2",
  "mb-2",
  "pr-5",
  "dark:focus:ring-white",
  "ring-1"
);

export const SolidInputFieldClasses = clsx(
  "mt-1",
  "block",
  "w-full",
  "border",
  "border-primary",
  "rounded-md",
  "shadow-sm",
  "p-2"
);

export const InputLabelClasses2 = clsx(
  "block",
  "text-sm",
  "font-medium",
  "text-primary",
  "mb-1"
);

export const YellowButtonClasses = clsx(
  "bg-button_yellow",
  "px-5",
  "min-w-64",
  "hover:yellow-700",
  "hover:text-white",
  "align-middle",
  "select-none",
  "font-sans",
  "font-bold",
  "text-center",
  "uppercase",
  "transition-all",
  "disabled:opacity-90",
  "disabled:shadow-none",
  "disabled:pointer-events-none",
  "text-xs",
  "py-3",
  "px-16",
  "rounded-lg",
  "bg-accent",
  "text-primary",
  "shadow-md",
  "shadow-gray-900/10",
  "hover:shadow-lg",
  "hover:shadow-gray-900/20"
);
