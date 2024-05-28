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
  "z-10"
);

export const RegisterModalClasses = clsx(
  "flex",
  "md:rounded-lg",
  "md:shadow-2xl",
  "md:w-[1000px]",
  "md:h-[700px]",
  "xl:w-[1150px]",
  "h-full",
  "w-full"
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
  "disabled:border-t-transparent",
  "transition-all",
  "placeholder-shown:border",
  "placeholder-shown:border-blue-gray-200",
  "placeholder-shown:border-t-blue-gray-200",
  "border",
  "focus:border-2",
  "focus:border-t-transparent",
  "text-sm",
  "px-3",
  "py-2.5",
  "rounded-[7px]",
  "border-primary",
  "focus:border-gray-900"
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
  "peer-disabled:text-transparent",
  "peer-disabled:peer-placeholder-shown:text-blue-gray-500",
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
  "peer-disabled:before:border-transparent",
  "before:border-blue-gray-200",
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
  "peer-disabled:after:border-transparent",
  "after:border-blue-gray-200",
  "peer-focus:after:!border-gray-900"
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

export const NavLink = clsx("text-white", "hover:text-gray-300");

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
  "text-black",
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
  "text-sm",
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
  "disabled:opacity-90",
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
  "shadow-lg"
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
  "shadow-blue-gray-500/40"
);

export const CourseCardImageClsx = clsx(
  "absolute",
  "inset-0",
  "w-full",
  "h-full",
  "bg-gradient-to-tr",
  "from-transparent",
  "via-transparent",
  "to-black/60"
);

export const CourseCardTitleContainerClsx = clsx(
  "flex",
  "items-center",
  "justify-between",
  "min-h-[80px]",
  "md:min-h-[75px]",
  "2xl:min-h-[60px]",
  "w-full"
);

export const CourseCardTitle = clsx(
  "block",
  "font-sans",
  "text-[20px]",
  "antialiased",
  "font-medium",
  "leading-snug",
  "tracking-normal",
  "text-blue-gray-900"
);
export const CourseCardDescription = clsx(
  "block",
  "font-sans",
  "text-base",
  "antialiased",
  "text-grey-700",
  "font-light",
  "min-h-[80px]",
  "md:min-h-[72px]",
  "2xl:min-h-[47px]"
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
  "sm:w-[600px]",
  "sm:h-[800px]",
  "px-16",
  "pt-4"
);
