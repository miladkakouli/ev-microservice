export class CommandDto {
  command: string;
  station: number;
  fullcommand: string;

  constructor(command: string) {
    const c: string[] = command.split(' ');
    this.fullcommand = command;
    this.command = c[0];
    this.station = parseInt(c[c.length - 1]);
  }
}
