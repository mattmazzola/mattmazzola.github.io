import { Project } from '~/models'

export const projects: Project[]  = [
    {
        name: "Using Folders outside Workspace root in .devcontainer",
        imgUrl: "images/user_folder_outside_workspace.png",
        articleUrl: "https://mattmazzola.medium.com/how-to-use-folders-outside-the-workspace-root-in-a-devcontainer-ce39c9907260",
        description: "VSCode, Workspace, Devcontainer, Docker",
    },
    {
        name: "Question Answering Demo",
        imgUrl: "images/sc2iq_qna.gif",
        websiteUrl: "https://sc2iq-qna.wittymushroom-4573c752.westus3.azurecontainerapps.io/",
        codeUrl: "https://github.com/sc2iq/sc2iq/tree/master/apps/question-answer",
        description: "RemixJS + Media Stream API + Blob Storage + OpenAI Whisper",
    },
    {
        name: "SC2 Balance Data Processor",
        imgUrl: "images/azure_functions_file_upload.png",
        websiteUrl: "https://sc2-info-balancedata-uploader.wittymushroom-4573c752.westus3.azurecontainerapps.io/",
        articleUrl: "https://mattmazzola.medium.com/how-to-build-an-application-which-processes-user-uploaded-files-using-azure-functions-remix-and-8d0ba7374360",
        codeUrl: "https://github.com/sc2iq/sc2info/tree/master/apps/balance-data-upload",
        description: "Use Azure Functions, Remix and XState to process files",
    },
    {
        name: "Batch Processor",
        imgUrl: "images/BatchProcessor.png",
        websiteUrl: "https://batch-processor-client.wittymushroom-4573c752.westus3.azurecontainerapps.io/",
        articleUrl: "https://mattmazzola.medium.com/how-to-build-a-scalable-background-processor-using-azure-container-apps-7b6d4ec8e4fe",
        codeUrl: "https://github.com/mattmazzola/batch-processor",
        description: "Scalable Background Processors using Azure Container Apps",
    },
    {
        name: "Slate Entity Labeler v2",
        imgUrl: "images/slate-next-labeler.png",
        websiteUrl: "https://mattmazzola.github.io/slate-entity-labeler-next/",
        codeUrl: "https://github.com/mattmazzola/slate-entity-labeler-next",
        description: "Rebuilt entity labeler with next version SlateJS",
    },
    {
        name: "Personal Projects Site",
        imgUrl: "images/projectsSite.png",
        codeUrl: "https://github.com/mattmazzola/mattmazzola.github.io",
        description: "Simple Grid of Projects",
    },
    {
        name: "Women of Valorant",
        imgUrl: "images/womenofvalorant.png",
        codeUrl: "https://github.com/mattmazzola/valorant-women",
        websiteUrl: "https://wov-containerapp-client.wittymushroom-4573c752.westus3.azurecontainerapps.io/",
        description: "React Drag-n Drop controls, Node / Cosmos SQL service",
    },
    {
        name: "Elo Rating System",
        imgUrl: "images/elo01.png",
        codeUrl: "https://github.com/sc2iq/sc2iq/tree/master/packages/ratingSystem",
        websiteUrl: "https://mattmazzola.medium.com/understanding-the-elo-rating-system-264572c7a2b4",
        description: "Elo Rating System, Logistic Curve"
    },
    {
        name: "Sc2Info Chat Bots",
        imgUrl: "images/sc2infoBot.png",
        codeUrl: "https://github.com/sc2iq/sc2info/tree/master/bots",
        websiteUrl: "https://www.sc2info.com/ask",
        description: "Discord, Twitch, Bots, Fuse.js, Local Extraction"
    },
    {
        name: "Slate Mention Editor",
        imgUrl: "images/slateMentionEditor.png",
        codeUrl: "http://www.github.com/mattmazzola/slate-mention-editor",
        websiteUrl: "https://mattmazzola.github.io/slate-mention-editor/",
        description: "SlateJS, mentions",
    },
    {
        name: "sc2info.com",
        imgUrl: "images/sc2info.png",
        codeUrl: "http://www.github.com/sc2iq/sc2info",
        websiteUrl: "https://sc2-info-viewer.wittymushroom-4573c752.westus3.azurecontainerapps.io",
        description: "Graphql, foundation for QnA chatbots",
    },
    {
        name: "SchultzTables",
        imgUrl: "images/schultztables.png",
        codeUrl: "https://github.com/mattmazzola/schultz-tables",
        articleUrl: "https://mattmazzola.medium.com/schultz-tables-app-ab5d4904a09f",
        websiteUrl: "https://schultztables-client.wittymushroom-4573c752.westus3.azurecontainerapps.io/",
        description: "Modals, CSS Grid, Auth0 + TypeScript",
    },
    {
        name: "Slate Entity Labeler",
        imgUrl: "images/slateEntityLabeler.png",
        codeUrl: "http://www.github.com/mattmazzola/slate-entity-labeler",
        articleUrl: "https://mattmazzola.medium.com/slate-entity-labeler-is-published-a1a2e439e6fb",
        websiteUrl: "https://mattmazzola.github.io/slate-entity-labeler/",
        description: "SlateJS, keyword selection",
    },
    {
        name: "React Simple Auth",
        imgUrl: "images/reactSimpleAuth.png",
        codeUrl: "https://github.com/mattmazzola/react-simple-auth",
        websiteUrl: "https://mattmazzola.medium.com/react-simple-auth-react-redux-oauth-2-0-de6ea9df0a63",
        description: "React Authentication, Ember Simple Auth"
    },
    {
        name: "Unofficial FRC Trainer",
        imgUrl: "images/frc.png",
        codeUrl: "https://github.com/mattmazzola/frc",
        websiteUrl: "https://frc.surge.sh/",
        description: "React, PWA, Text-To-Speech"
    },
    {
        name: "ColorQueue",
        imgUrl: "images/colorqueue.png",
        codeUrl: "https://github.com/mattmazzola/colorqueueapp",
        websiteUrl: "https://mattmazzola.medium.com/using-adafruit-dotstar-led-strips-with-raspberry-pi-or-remotely-controlling-raspberry-pi-from-2d20b1792047",
        description: "Rasb Pi, Firebase, LED Strips"
    },
    {
        name: "Medium",
        imgUrl: "images/medium.png",
        codeUrl: "http://mattmazzola.medium.com",
        description: "Varous articles about these projects",
    },
    {
        name: "Twitter",
        imgUrl: "images/twitter.png",
        codeUrl: "https://twitter.com/mdmazzola",
        description: "Thoughts and Announcements",
    },
    {
        name: "Github",
        imgUrl: "images/github_placeholder.png",
        codeUrl: "http://www.github.com/mattmazzola",
        description: "Various Projects",
    },
]

export default projects