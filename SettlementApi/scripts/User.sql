CREATE TABLE dbo.[User](
	ID UNIQUEIDENTIFIER PRIMARY KEY,
	[LoginID] NVARCHAR(50) NOT NULL,
	[Password] CHAR(32) NOT NULL,
	[Phone] VARCHAR(15) NULL,
	[Name] NVARCHAR(10) NULL,
	[Group]  UNIQUEIDENTIFIER NOT NULL,
	[Enabled] BIT NOT NULL DEFAULT(0),
	[CreateTime] DATETIME NOT NULL,
	[LastLoginIP] VARCHAR(50) NULL,
	[LastLoginTime] DATETIME NULL,
	[LastModifyTime] DATETIME NULL,  
	[LastModifyUser] UNIQUEIDENTIFIER NULL,
	[Deleted] BIT NOT NULL DEFAULT(0)
)