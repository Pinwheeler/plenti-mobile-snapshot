import { DateTime } from "luxon";

// A Peer message is a message that has the same kind of data as a chat message
// but should not be displayed in the chat history
export class PeerMessageEntity {
  toAccountId: number;
  fromAccountId: number;
  text: string;
  sentDate: DateTime;

  static peerMessageRegex = /^(\d*)``(\d*)``(.*)``(.*)$/;
  static isPeerMessage(value: string): boolean {
    return PeerMessageEntity.peerMessageRegex.test(value);
  }

  constructor(
    toAccountId: number,
    fromAccountId: number,
    text: string,
    sentDate: DateTime
  ) {
    this.toAccountId = toAccountId;
    this.fromAccountId = fromAccountId;
    this.text = text;
    this.sentDate = sentDate;
  }

  static fromString(chatString: string): PeerMessageEntity {
    const result = PeerMessageEntity.peerMessageRegex.exec(chatString);
    if (!result) {
      throw new Error("not a peer message");
    }
    const fromAccountId = parseInt(result[1] ?? "0", 10);
    const toAccountId = parseInt(result[2] ?? "0", 10);
    const sentDate = result[3];
    const text = result[4];

    const date = DateTime.fromFormat(sentDate, "YYYY-MM-DD[T]HH:mm:ss.SSSZZ");

    return new PeerMessageEntity(toAccountId, fromAccountId, text, date);
  }
}
