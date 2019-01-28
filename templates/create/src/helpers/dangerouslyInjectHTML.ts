function dangerouslyInjectHTML(htmlString: string) {
  return { __html: htmlString };
}

export default dangerouslyInjectHTML;
