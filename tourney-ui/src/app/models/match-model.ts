export interface Match {
    _id: string;
    tourneyId: string;
    player1: string;
    player2: string;
    datePlayed: Date;
    score?: Object;
};
