interface projectData {
  name: string;
  id: string;
  group: string;
}

interface groupType {
  name: string;
  id: string;
  createdAt: Date;
}

interface groupByName {}

interface joinedType {
  name: string;
  groupId: groupType;
  projects: projectData[];
}

export function groupProjectsByGroupName(projetos: projectData[]) {
  return projetos.reduce((acc, item) => {
    acc[item.group] = acc[item.group] || [];
    acc[item.group].push(item);

    return acc;
  }, {} as any);
}

export function joinGroupAndProjects({ groups, projects }: any) {
  const keyValuePairs = Object.entries(groups);

  return keyValuePairs.reduce((acc, [key, group]) => {
    const groupID: groupType = group as never;

    acc.push({
      name: groupID.name,
      groupId: groupID.id,
      createdAt: groupID.createdAt,
      projects: projects[key] || [],
    });

    return acc;
  }, [] as any);
}
