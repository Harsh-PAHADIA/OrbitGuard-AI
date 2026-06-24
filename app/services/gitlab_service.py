class GitLabService:

    def create_mr_comment(self, text):
        return {
            "status": "comment_created",
            "comment": text
        }
