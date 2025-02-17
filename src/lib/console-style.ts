export const consoleStyle = {
  // Headers and titles
  header: (text: any) =>
    console.log(
      `%c${text}`,
      "color: white; background: linear-gradient(to right, #00b4db, #0083b0); padding: 10px; font-size: 16px; font-weight: bold; border-radius: 5px;",
    ),

  // Success messages
  success: (text: any) =>
    console.log(
      `%c${text}`,
      "color: #0f9d58; background: #e8f5e9; padding: 5px; font-size: 14px; border-left: 4px solid #0f9d58;",
    ),

  // Error messages
  error: (text: any) =>
    console.log(
      `%c${text}`,
      "color: #db4437; background: #fde7e9; padding: 5px; font-size: 14px; border-left: 4px solid #db4437;",
    ),

  // Warning messages
  warning: (text: any) =>
    console.log(
      `%c${text}`,
      "color: #f4b400; background: #fff8e1; padding: 5px; font-size: 14px; border-left: 4px solid #f4b400;",
    ),

  // Info messages
  info: (text: any) =>
    console.log(
      `%c${text}`,
      "color: #4285f4; background: #e8f0fe; padding: 5px; font-size: 14px; border-left: 4px solid #4285f4;",
    ),

  // Debug messages
  debug: (text: any) =>
    console.log(
      `%c${text}`,
      "color: #9334e6; background: #f3e8fd; padding: 5px; font-size: 14px; border-left: 4px solid #9334e6;",
    ),

  // Table styling
  table: (data: any) => {
    console.log(
      "%cTable Data:",
      "color: #333; font-size: 14px; font-weight: bold;",
    );
    console.table(data);
  },

  // Group styling
  group: (title: any, content: () => void) => {
    console.group(
      `%c${title}`,
      "color: #333; font-size: 14px; font-weight: bold;",
    );
    content();
    console.groupEnd();
  },
};
