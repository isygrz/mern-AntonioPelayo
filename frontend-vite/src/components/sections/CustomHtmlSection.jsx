/* eslint-disable no-unused-vars */
const CustomHTMLSection = ({ settings, order, enabled }) => {
  return (
    <div
      className="p-4 border rounded bg-neutral-100 dark:bg-neutral-900 text-sm text-neutral-700 dark:text-neutral-300"
      dangerouslySetInnerHTML={{
        __html: settings?.html || '<em>[CustomHTMLSection] Placeholder</em>',
      }}
    />
  );
};

export default CustomHTMLSection;
