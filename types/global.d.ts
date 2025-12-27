export {};

declare global {
  interface Window {
    EJS_player: string;
    EJS_gameName: string;
    EJS_gameUrl: string;
    EJS_core: string;
    EJS_pathtodata: string;
    EJS_startOnLoaded: boolean;
    EJS_disableDatabases: boolean;
    EJS_language: string;
    EJS_biosUrl?: string;
    EJS_gameID?: number;
    EJS_netplayServer?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    EJS_netplayICEServers?: any[];
    EJS_EXPERIMENTAL_NETPLAY?: boolean;
    EJS_DEBUG_XX?: boolean;
    EJS_Buttons?: {
      netplay?: boolean;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
    };
  }
}
