<script lang="ts">
	import * as AvatarGroup from '$lib/components/ui/avatar-group';

	const members = [
		{
			username: 'huntabyte',
			image: 'https://github.com/huntabyte.png'
		},
		{
			username: 'AdrianGonz97',
			image: 'https://github.com/AdrianGonz97.png'
		},
		{
			username: 'shyakadavis',
			image: 'https://github.com/shyakadavis.png'
		}
	];
</script>

<AvatarGroup.Root>
	{#each members as member (member.username)}
		<AvatarGroup.Member>
			<AvatarGroup.MemberImage src={member.image} alt={member.username} />
			<AvatarGroup.MemberFallback>
				{member.username[0]}
			</AvatarGroup.MemberFallback>
		</AvatarGroup.Member>
	{/each}
	<AvatarGroup.Etc plus={2} />
</AvatarGroup.Root>
