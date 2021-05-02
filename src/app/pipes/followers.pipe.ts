import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'followers'
})
export class FollowersPipe implements PipeTransform {

  transform(value: any[], ...args: unknown[]): string {
    if (!value.length) return `No one is following you`;

    const [firstFollow, secondFollow, ...rest] = value;
    const firstUser = firstFollow.follower.username;

    if (!secondFollow) {
      return `Followed by ${firstUser}`;
    }

    const secondUser = secondFollow.follower.username;

    if (!rest.length) return `Followed by ${firstUser} and ${secondUser}`;

    return `Followed by ${firstUser}, ${secondUser} and ${rest.length} other${rest.length > 1 ? 's' : ''}`;
  }

}
