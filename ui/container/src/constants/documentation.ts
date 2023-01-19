const docsUrl = "https://docs.isaac.jnj.com/docs/";

function getUrl(path: string) {
    return docsUrl + path;
}

export default {
    agents: {
        components: getUrl("agents/components#output-arguments")
    }
}