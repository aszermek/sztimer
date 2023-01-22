import { randomScrambleForEvent } from "cubing/scramble";

class ScrambleService {
    public async getScramble(event: string): Promise<string> {
        const scramble = await randomScrambleForEvent(event);
        return scramble.toString();
    }
}

export default new ScrambleService();