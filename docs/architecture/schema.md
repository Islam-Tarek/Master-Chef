**Users**:
|     | Column | Type |
|-----|--------|------|
| PK  | ID | STRING/UUID |
|     | First name | STRING |
|     | Last name | STRING |
| UQ  | Email | STRING |
| UQ  | Username | STRING |
|   | Password | STRING |

**Posts**:
|     | Column | Type |
|-----|--------|------|
| PK  | ID | STRING/UUID |
|     | Title | STRING |
| UQ  | Content | STRING |
| FK  | UserId | STRING/UUID |
|     | PostedAt | Timestamp |

**Likes**:
|     | Column | Type |
|-----|--------|------|
| PK  | Id | STRING/UUID |
| FK  | UserId | STRING/UUID |
| FK  | PostId | STRING |

**Comments**:
|     | Column | Type |
|-----|---------|------|
| PK  | ID  | STRING |
| FK  | UserId | STRING/UUID |
| FK  | PostId | STRING |
|     | Comment | STRING |
|     | PostedAt | Timestamp |

**user_information**:
|     | Column | Type |
|-----|---------|------|
| FK  | UserId | STRING/UUID |
|     | About | STRING |
|     | JoinedAt | Timestamp |

